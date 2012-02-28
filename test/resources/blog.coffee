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

  describe 'options', ->
    it 'should been setup properly the options'



  describe 'Receive a list of all Blogs', ->
    beforeEach ->
      @api = nock "https://#{KEY}:#{PASSWORD}@#{STORE}.myshopify.com"
      @blog = new Blog KEY, PASSWORD, STORE


    it 'should be possible get a list of all blog like an Array', (done) ->
      @blog.all (err, blogs) ->
        blogs.should.be.an.instanceof Array
        done()
    
    it 'should call at server to get the blogs', (done)->
      fixture = loadFixture 'blog/blogs'
      @api.get('/admin/blogs.json').reply 200, fixture

      @blog.all (err, blogs) =>
        @api.done
        blogs.should.equal fixture
        done(err)
