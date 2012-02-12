should = require 'should'
Client = require '../lib/client'
Article = require '../lib/resources/article'
Asset = require '../lib/resources/asset'

pass = 'MY_DUMMY_PASS'
key = 'MY_DUMMY_KEY'
failResource = 'failResource'
resourceId = 'article'

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
    
    describe '#get', ->
      beforeEach ->
        @client = new Client pass, key

      it 'client instance should have it', ->
        should.exist @client.get

      it 'should throw an exception if call without resource id', ->
        (=>@client.get()).should.throw('resource id missing or invalid')

      it 'should throw an exception if try to get a not resource', ->
        (=>@client.get(failResource)).should.throw('resource id missing or invalid')

      it 'should return a Article instance if resource id is "article"', ->
        article = @client.get 'article', {blog: 1}
        article.should.be.an.instanceof Article
      

      it 'should return a Asset instance if resource id is "asset"', ->
        asset = @client.get 'asset'
        asset.should.be.an.instanceof Asset

      it 'should return a Blog instance if resource id is "blog"'
      it 'should return a Comment instance if resource id is "comment"'
      it 'should return a CustomCollection instance if resource id is "customCollection"'
      it 'should return a Custumer instance if resource id is "custumer"'
      it 'should return a CustumerGroup instance if resource id is "custumerGroup"'
      it 'should return a Event instance if resource id is "event"'
      it 'should return a Fulfillment instance if resource id is "fulfillment"'
      it 'should return a Metafield instance if resource id is "metafield"'
      it 'should return a Order instance if resource id is "order"'
      it 'should return a Page instance if resource id is "page"'
      it 'should return a ProductImage instance if resource id is "productImage"'
      it 'should return a ProductVariant instance if resource id is "productVariant"'
      it 'should return a ProductSearchEngine instance if resource id is "productSearchEngine"'
      it 'should return a Province instance if resource id is "province"'
      it 'should return a Redirect instance if resource id is "redirect"'
      it 'should return a ScriptTag instance if resource id is "scriptTag"'
      it 'should return a Shop instance if resource id is "shop"'
      it 'should return a SmartCollection instance if resource id is "smartCollection"'
      it 'should return a Theme instance if resource id is "theme"'
      it 'should return a Transactions instance if resource id is "transactions"'
      it 'should return a WebHook instance if resource id is "webHook"'
