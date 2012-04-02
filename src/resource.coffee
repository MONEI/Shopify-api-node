request = require 'request'

class Resource

  format: "json"

  constructor: () ->  

  __request__: (path, method, body, cb) ->

    if typeof body is 'function'
      cb = body
      body = null

    options =
      uri: "https://#{@key}:#{@pass}@#{@shop}.myshopify.com/admin#{path}"
      method: method
    options.body = body if body?

    request options, ( err, response ,body) ->
      status = parseInt response.statusCode

      if status >= 300 then err = new Error "Status code #{status}" else err = null
      unless err?
        process.nextTick ->
          cb err, JSON.parse body
      else
        process.nextTick ->
          cb err

  get: (path, cb) ->
    @__request__(path, 'GET', cb)

  post: (path, body, cb) ->
    @__request__(path, 'POST', JSON.stringify(body), cb)

  update: (path, body, cb) ->
    @__request__(path, 'PUT', JSON.stringify(body), cb)


module.exports = Response



