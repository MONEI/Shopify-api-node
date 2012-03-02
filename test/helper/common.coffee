{readFileSync} = require 'fs'

loadFixture = (fixture) ->
  readFileSync "#{__dirname}/../fixtures/#{fixture}.json", 'utf8'
  
#exports.nock = require 'nock'
exports.fakeweb = require 'node-fakeweb'
exports.KEY = '123456'
exports.PASSWORD = 'password'
exports.STORE = 'myShop'
exports.loadFixture = loadFixture
