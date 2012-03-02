class Client
  
  resources = ['blog']

  constructor: (@pass, @key, @shop) ->
    throw new Error 'pass, key or shop missing' unless pass? and key? and shop?
    for resource in resources
      do (resource) =>
        @["#{resource}"] = (=>
          Resource = require "./resources/#{resource}"
          new Resource @key, @pass, @shop
        )()

module.exports = Client
