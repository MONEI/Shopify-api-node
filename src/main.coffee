Session = require './session-oauth'


exports.createSession = (url, token, apiKey, secret, params) ->
	new Session(url, token, apiKey, secret, params)
