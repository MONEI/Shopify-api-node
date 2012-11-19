Session = require './session-oauth'


exports.createSession = (storename, apiKey, secret, params) ->
	new Session(storename, apiKey, secret, params)
