{KEY, PASSWORD, STORE, nock, loadFixture} = require './../helper/common'

should = require 'should'

Blog = require '../../lib/resources/blog'

describe 'Blog', ->
  it 'should be exist', ->
    should.exist Blog
  describe '#constructor', ->
    it 'should throw a error if there not key, pass or shop', ->
      (-> new Blog()).should.throw 'Blog missing parameters'
      (-> new Blog(KEY)).should.throw 'Blog missing parameters'
      (-> new Blog(KEY, PASSWORD)).should.throw 'Blog missing parameters'
      (-> new Blog(KEY, PASSWORD, STORE)).should.not.throw()

  describe 'Receive a list of all Blogs', ->
    before ->
      @fixture = loadFixture 'blog/blogs'
      @url = "http://#{STORE}.myshopify.com"
      @blog = new Blog KEY, PASSWORD, STORE


    it 'should be possible get a list of all blog like an Object', (done) ->
      nock(@url).get('/admin/blogs.json').replyWithFile(200, __dirname + '/../fixtures/blog/blogs.json')
      @blog.all (err, blogs) =>
        blogs.should.be.an.instanceof Object
        done(err)
    
    it 'should call at server to get the blogs', (done)->
      nock(@url).get('/admin/blogs.json').replyWithFile(200, __dirname + '/../fixtures/blog/blogs.json')
      @blog.all (err, blogs) =>
        blogs.should.eql @fixture
        done(err)

    it 'should return a error if the status code is not 20x', (done) ->
      nock(@url).get('/admin/blogs.json').reply(404, 'KO!')
      @blog.all (err, blogs) =>
        err.should.exist
        done()
        err.should.be.an.instanceof Error

    it 'should be able request blogs since special id', (done) ->
      nock(@url).get('/admin/blogs.json?since_id=241253187').replyWithFile(200, __dirname + '/../fixtures/blog/blogs_since.json')
      @blog.all 241253187, (err, blogs) ->
        should.not.exist err
        blogs.should.eql loadFixture 'blog/blogs_since'
        done()

    it 'should return a err if the server fails', (done) ->
      nock(@url).get('/admin/blogs.json?since_id=241253187').reply(404, 'KO!')
      @blog.all 241253187, (err, blogs) ->
        should.exist err
        err.should.be.an.instanceof Error
        should.not.exist blogs
        err.message.should.eql 'Status code 404'
        done()

  describe 'Receive a count of all Blogs', ->

    it 'Should exist a method to get the count of all blogs', ->
      should.exist @blog.count

    it 'Should get the count of blogs for this shop', (done) ->
      nock(@url).get('/admin/blogs/count.json').replyWithFile(200, __dirname + '/../fixtures/blog/count.json')
      @blog.count (err, count) ->
        should.not.exist err
        count.count.should.eql 1
        done()
