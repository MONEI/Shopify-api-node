should = require 'should'
Nodify = require '../lib/main'

pass = 'MY_DUMMY_PASS'
key = 'MY_DUMMY_KEY'

describe 'Nodify', ->
  it 'should exist', ->
    should.exist Nodify

  it 'should be a object', ->
    Nodify.should.be.a 'object'
  
  describe 'Nodify.Client', ->
  
    it 'should exist', ->
      should.exist Nodify.Client
    
    it 'Nodify.Client should be typeof Function', ->
      Nodify.Client.should.be.a 'function'
    
    it 'client should be a instance of Client', ->
      client = new Nodify.Client(pass, key)
      client.should.be.a.instanceof Nodify.Client

