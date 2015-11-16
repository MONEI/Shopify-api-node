AuthSession = require './session-oauth'
Session = require './session'

exports.createSession = (storename, apiKey, secret, params) ->
	new AuthSession(storename, apiKey, secret, params)

exports.createPrivateAppSession = (storename, apiKey, password, params) ->
	new Session(storename, apiKey, password, params)
