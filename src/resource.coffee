request = require 'request'
querystring = require 'querystring'

class Resource

  constructor: () ->  
  #TODO: add object name as a param to all request to parse results properly  
  __request__: (url, method, fields, callback) ->
    [fields, callback] = [callback, fields] if typeof fields is 'function'

    options =
      uri: url
      method: method
      json: true

    if fields? 
      options.body = JSON.stringify(fields)
      
    request options, ( err, response, body) ->
      status = parseInt response.statusCode

      if status >= 300 then err = new Error "Status code #{status}" else err = null
      unless err?
        process.nextTick ->
          for b of body
            body = body[b]
            break
          callback err, body
      else
        process.nextTick ->
          console.log body
          callback err

  get: (url, callback) ->
    @__request__(url, 'GET', callback)

  post: (url, fields, callback) ->
    @__request__(url, 'POST', fields, callback)

  put: (url, fields, callback) ->
    @__request__(url, 'PUT', fields, callback)

  delete: (url, callback) ->
    @__request__(url, 'DELETE', callback)

  queryString: (url, params, format = "json") ->
    query = "#{url}.#{format}"

    if params
      query += "?"
      query += querystring.stringify params

    return query








module.exports = new Resource



