request = require 'request'
querystring = require 'querystring'
singleton = require 'singleton'

class Resource extends singleton

  constructor: (@oauth = no) ->

  __request__: (url, slug, method, fields, callback) ->
    [fields, callback] = [callback, fields] if typeof fields is 'function'

    options =
      uri: url
      method: method
      json: slug isnt 'oauth'
      headers:if @oauth is yes and @oauth_token? then {'X-Shopify-Access-Token':@oauth_token} else {}

    options.headers['content-type'] = 'application/x-www-form-urlencoded' if method is "POST"

    if fields?
      params = {}
      if slug isnt 'oauth'
        params[slug] = fields
        options.body = JSON.stringify(params)
      else
        options.body = fields

    request options, ( err, response, body) ->
      status = parseInt response.statusCode

      if status >= 300 then err = new Error "Status code #{status}" else err = null
      unless err?
        process.nextTick ->
          body = body[slug] if slug isnt 'oauth' and slug isnt '' and typeof slug isnt 'undefined' 
          body = slug if method is "DELETE"
          callback err, body
      else
        process.nextTick ->
          callback err

  get: (url, slug, callback) ->
    @__request__(url, slug, 'GET', callback)

  post: (url, slug, fields, callback) ->
    @__request__(url, slug, 'POST', fields, callback)

  put: (url, slug, fields, callback) ->
    @__request__(url, slug, 'PUT', fields, callback)

  delete: (url, slug, callback) ->
    @__request__(url, slug, 'DELETE', callback)

  queryString: (url, params, format = "json") ->
    query = "#{url}.#{format}"

    if params
      query += "?"
      query += querystring.stringify params

    return query


  setOAuthToken:(@oauth_token)->
    @oauth = @oauth_token?


module.exports = Resource.get()
