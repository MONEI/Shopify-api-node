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

    it 'Should get an error is the server fail', (done) ->
      nock(@url).get('/admin/blogs/count.json').reply(302, 'Redirect!')
      @blog.count (err, count) ->
        should.exist err
        should.not.exist count
        err.message.should.eql 'Status code 302'
        done()

  describe 'Receive a single Blog', ->
  
    it 'should exist a method to get a sinlge blog', ->
      should.exist @blog.get
      @blog.get.should.be.an.instanceof Function

    it 'should throw a exception if not id given', ->
      (=> @blog.get()).should.throw 'missing id'
      (=> @blog.get(123456)).should.not.throw

    it 'should return a Blog given an id', (done) ->
      nock(@url).get('/admin/blogs/241253187.json').replyWithFile(200, __dirname + '/../fixtures/blog/get.json')
      @blog.get 241253187, (err, blog) ->
        should.not.exist err
        blog.should.eql loadFixture 'blog/get'
        done()




  describe 'Create a new Blog', ->

    it 'should exist a method to create a new blog', ->
      should.exist @blog.create
      @blog.create.should.be.an.instanceof Function

    it 'should throw a exception if is call w/o title', ->
      ( =>@blog.create() ).should.throw 'missing title'
      ( =>@blog.create 'title' ).should.not.throw()
    
    it 'should send the title to the server', (done) ->
      nock(@url).post('/admin/blogs.json', loadFixture 'blog/create_req').replyWithFile(201, __dirname + '/../fixtures/blog/create_res.json')
      @blog.create 'Apple main blog', (err, res) ->
        should.not.exist err
        res.blog.title.should.eql 'Apple main blog'
        done()
    
    it 'should return a error if the server fail', (done) ->
      nock(@url).post('/admin/blogs.json', loadFixture 'blog/create_req').reply(401, 'KO!')
      @blog.create 'Apple main blog', (err, res) ->
        should.exist err
        should.not.exist res
        err.message.should.eql 'Status code 401'
        done()

    it 'should create a empty blog with metafields', (done) ->
      nock(@url).post('/admin/blogs.json', loadFixture 'blog/create_req_metas').replyWithFile(201, __dirname + '/../fixtures/blog/create_res_metas.json')
      metas = [{key: "new", value: "newvalue", value_type: "string", namespace: "global"}]
      @blog.create 'Apple main blog', metas, (err, res) ->
        should.not.exist err
        res.should.eql loadFixture 'blog/create_res_metas'
        done()

  describe 'Modify an existing Blog', ->
    it 'Should exist a method to update a Blog', ->
      should.exist @blog.update

    it 'should throw a exception if call w/o id', ->
      (=> @blog.update()).should.throw 'missing params'
      (=> @blog.update(123456)).should.not.throw

    it 'should throw a exception if call w/o field to update', ->
      (=> @blog.update(123456)).should.throw 'missing params'

    it 'should be possible update blogs metafields', (done) ->
      nock(@url).put('/admin/blogs/241253187.json', loadFixture 'blog/update_req_metas').replyWithFile(201, __dirname + '/../fixtures/blog/update_res_metas.json')
      metas = [{key: "new", value: "newvalue", value_type: "string", namespace: "global"}]
      @blog.update 241253187, metas, (err, res) ->
        should.not.exist err
        res.should.eql loadFixture 'blog/update_res_metas'
        done()
    it 'should be possible update blogs title'
    it 'should be possible update title, handle and comments'
    it 'should return a error if the server fail'
  describe 'Remove a Blog from the database', ->
