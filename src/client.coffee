class Client
  
  resources = ['blog']

  constructor: (@pass, @key) ->
    throw new Error 'pass or key missing' unless pass? and key?
    for resource in resources
      do (resource) =>
        @["#{resource}"] = (=>
          Resource = require "./resources/#{resource}"
          new Resource
        )()

module.exports = Client
