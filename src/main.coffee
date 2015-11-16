# Session = require './session-oauth'
Session = require './session'

exports.createSession = (storename, apiKey, secret, params) ->
	new Session(storename, apiKey, secret, params)
