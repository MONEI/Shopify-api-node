singleton = require 'singleton'
request = require 'request'
qs = require 'qs'

class Resource extends singleton

  constructor: (@oauth = no) ->

  __request__: (url, slug, method, fields, callback) ->
    [fields, callback] = [callback, fields] if typeof fields is 'function'

    options =
      uri: url
      method: method
      json: slug isnt 'oauth'
      headers: if @oauth is yes and @oauth_token then {
        'X-Shopify-Access-Token': @oauth_token
      } else {}

    if method is 'POST'
      options.headers['content-type'] = 'application/x-www-form-urlencoded'

    if fields
      params = {}
      if slug and slug isnt 'oauth'
        params[if typeof slug is 'object' then slug.short else slug] = fields
        options.body = JSON.stringify params
      else
        options.body = fields

    request options, (err, res, body) ->
      if err or res.statusCode >= 300
        return process.nextTick ->
          callback err or new Error "Status code #{res.statusCode}";

      if method is 'DELETE'
        body = slug
      else if slug and slug isnt 'oauth' and typeof body is 'object'
        body = body[if typeof slug is 'object' then slug.long else slug]

      process.nextTick -> callback err, body

  get: (url, slug, callback) ->
    @__request__ url, slug, 'GET', callback

  post: (url, slug, fields, callback) ->
    @__request__ url, slug, 'POST', fields, callback

  put: (url, slug, fields, callback) ->
    @__request__ url, slug, 'PUT', fields, callback

  delete: (url, slug, callback) ->
    @__request__ url, slug, 'DELETE', callback

  queryString: (url, params, format = "json") ->
    query = "#{url}.#{format}"

    if params
      query += "?" + qs.stringify params, { arrayFormat: 'brackets' }

    return query

  setOAuthToken:(@oauth_token)->
    @oauth = @oauth_token?


module.exports = Resource.get()
