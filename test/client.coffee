should = require 'should'
Client = require '../lib/client'
Blog = require '../lib/resources/blog'

pass = 'MY_DUMMY_PASS'
key = 'MY_DUMMY_KEY'

describe 'Client', ->

  it 'Should exist', ->
    should.exist Client

  describe '#constructor', ->

    it 'should throw exception if not call with pass and key', ->
      (-> new Client()).should.throw('pass or key missing')
      (-> new Client(key)).should.throw('pass or key missing')

    it 'should not throw an exception if call with pass and key', ->
      (-> new Client(pass, key)).should.not.throw()

    describe 'pass and key value', ->
      beforeEach ->
        @client = new Client pass, key

      it 'should have a pass and key like instance variable', ->
        should.exist @client.pass
        should.exist @client.key

      it "pass should be #{pass}", ->
        @client.pass.should.eql pass

      it "key should be #{key}", ->
        @client.key.should.eql key
  describe '#blog', ->

    beforeEach ->
      @client = new Client pass, key

    it 'should not throw exection', ->
      (=> @client.blog).should.not.throw()

    it 'should return a instance of ', ->
      @client.blog.should.be.an.instanceof Blog

    it 'should have instance method´s blog', ->
      proto = Blog.prototype
      should.exist @client.blog["#{method}"] for method of proto
  describe '#asset', ->
  describe '#article', ->
