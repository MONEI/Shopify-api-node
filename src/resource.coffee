request = require 'request'
querystring = require 'querystring'

class Resource

  constructor: () ->  

  __request__: (url, slug, method, fields, callback) ->
    [fields, callback] = [callback, fields] if typeof fields is 'function'

    options =
      uri: url
      method: method
      json: true

    if fields?
      params[slug] = fields
      options.body = JSON.stringify(params)

    request options, ( err, response, body) ->
      status = parseInt response.statusCode

      if status >= 300 then err = new Error "Status code #{status}" else err = null
      unless err?
        process.nextTick ->
          body = body[slug]
          body = slug if method is "DELETE"
          callback err, body
      else
        process.nextTick ->
          console.log body
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



module.exports = new Resource



