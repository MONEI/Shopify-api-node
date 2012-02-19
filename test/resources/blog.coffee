should = require 'should'

Blog = require '../../lib/resources/blog'

describe 'Blog', ->
  it 'should be exist', ->
    should.exist Blog

  describe 'Receive a list of all Blogs', ->
    beforeEach ->
      @blog = new Blog

    it 'should be possible get a list of all blog like an Array', (done) ->
      @blog.all (err, blogs) ->
        blogs.should.be.an.instanceof Array
        done()
    
    it 'should call at server   '
