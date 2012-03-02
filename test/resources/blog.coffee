{KEY, PASSWORD, STORE, fakeweb, loadFixture} = require './../helper/common'

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
    before ->
      @fixture = loadFixture 'blog/blogs'
      fakeweb.allowNetConnect = false
      fakeweb.registerUri({uri: "http://#{STORE}.shopify.com:80/admin/blogs", body: @fixture})
      @blog = new Blog KEY, PASSWORD, STORE


    it 'should be possible get a list of all blog like an Array', (done) ->
      @blog.all (err, blogs) =>
        blogs.should.be.an.instanceof Object
        done(err)
    
    it 'should call at server to get the blogs', (done)->
      @blog.all (err, blogs) =>
        blogs.should.eql JSON.parse @fixture
        done(err)
