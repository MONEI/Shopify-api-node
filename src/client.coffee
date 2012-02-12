class Client
  resources =
    article: ''
    asset: ''
  
  constructor: (@pass, @key) ->
    throw new Error 'pass or key missing' unless pass? and key?

  get: (resource, opts) ->
    throw new Error 'resource id missing or invalid' unless resource? and resources["#{resource}"]?

    unless (typeof resources["#{resource}"] is 'function')
      Resource = require "./resources/#{resource}"
      resources["#{resource}"] = new Resource(opts)
    
    resources["#{resource}"]

module.exports = Client
