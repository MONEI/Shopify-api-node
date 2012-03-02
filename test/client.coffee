should = require 'should'
Client = require '../lib/client'
Blog = require '../lib/resources/blog'

pass = 'MY_DUMMY_PASS'
key = 'MY_DUMMY_KEY'
shop = 'MY_SHOP'

describe 'Client', ->

  it 'Should exist', ->
    should.exist Client

  describe '#constructor', ->

    it 'should throw exception if not call with pass, key or shop', ->
      (-> new Client()).should.throw('pass, key or shop missing')
      (-> new Client(key)).should.throw('pass, key or shop missing')

    it 'should not throw an exception if call with pass and key', ->
      (-> new Client(pass, key, shop)).should.not.throw()

    describe 'pass and key value', ->
      beforeEach ->
        @client = new Client pass, key, shop

      it 'should have a pass, key and shop like instance variable', ->
        should.exist @client.pass
        should.exist @client.key
        should.exist @client.shop

      it "pass should be #{pass}", ->
        @client.pass.should.eql pass

      it "key should be #{key}", ->
        @client.key.should.eql key

      it "shop should be #{key}", ->
        @client.shop.should.eql shop

  describe '#blog', ->

    beforeEach ->
      @client = new Client pass, key, shop

    it 'should not throw exception', ->
      (=> @client.blog).should.not.throw()

    it 'should return a instance of', ->
      @client.blog.should.be.an.instanceof Blog

    it 'should have instance method´s blog', ->
      proto = Blog.prototype
      should.exist @client.blog["#{method}"] for method of proto
  describe '#asset', ->
  describe '#article', ->
