{readFileSync} = require 'fs'

loadFixture = (fixture) ->
  JSON.parse(readFileSync "#{__dirname}/../fixtures/#{fixture}.json", 'utf8')
  
exports.nock = require 'nock'
exports.KEY = '123456'
exports.PASSWORD = 'password'
exports.STORE = 'myShop'
exports.loadFixture = loadFixture
