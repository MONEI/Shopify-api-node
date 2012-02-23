should = require 'should'
Nodify = require '../lib/main'

pass = 'MY_DUMMY_PASS'
key = 'MY_DUMMY_KEY'

describe 'Nodify', ->
  it 'should exist', ->
    should.exist Nodify

  it 'should be an object', ->
    Nodify.should.be.an 'object'
  
  describe 'Nodify.Client', ->
  
    it 'should exist', ->
      should.exist Nodify.Client
    
    it 'Nodify.Client should be typeof Function', ->
      Nodify.Client.should.be.a 'function'
    
    it 'client should be an instance of Client', ->
      client = new Nodify.Client(pass, key)
      client.should.be.a.instanceof Nodify.Client

