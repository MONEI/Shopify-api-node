should = require 'should'
Article = require '../../lib/resources/article'

blogId = 1

describe 'Article', ->
  it 'should exist', ->
    should.exist Article

  describe '#constructor', ->

    it 'should be throw exception if call without a blog id', ->
      (-> new Article()).should.throw('missing blog id')

    it 'should not throw a exception if call with a blog id', ->
      (-> new Article({blog: blogId})).should.not.throw()
