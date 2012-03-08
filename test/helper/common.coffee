{readFileSync} = require 'fs'

loadFixture = (fixture) ->
  readFileSync "#{__dirname}/../fixtures/#{fixture}.json", 'utf8'
  
#exports.nock = require 'nock'
exports.nock = require 'nock'
exports.KEY = '123456'
exports.PASSWORD = 'password'
exports.STORE = 'myshop'
exports.loadFixture = loadFixture
