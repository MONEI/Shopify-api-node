Blog = require './resources/blog'
Product = require './resources/product'
Order = require './resources/order'
Resource = require './resource'
Session = require './session'

class SessionOAuth extends Session

  constructor:(@store_name, @api_key, @secret, params = {})->
    super @store_name, @api_key, @secret
    if typeof params == 'string'
      @persistent_token = params
      params = {persistent_token: @persistent_token}
    else
      params = params || {}
      @persistent_token = params.persistent_token || null
    @params = params
    @registerOAuthToken params

  onRedirectUrl:(url, cb)->
    url.replace /\?code=[\w\d]+/, (code)=>
      temp_token = code.split('=')[1]
      @requestPermanentAccessToken temp_token, (@persistent_token)=>
        @registerOAuthToken()
        process.nextTick =>
          cb(@store_name, @persistent_token)

  requestPermanentAccessToken:(temp_token, cb)->
    params = "client_id=#{@api_key}&client_secret=#{@secret}&code=#{temp_token}"
    Resource.post "#{@site()}/oauth/access_token", 'oauth', params, (err, response)=>
      if err?
        throw err
        return
      response = JSON.parse response
      process.nextTick ->
        cb response.access_token

  requestTemporaryAccessToken:()=>
    scope = @getScope()
    if(!scope.length)
      @params.onAskToken(Error("No Shopify scope defined, cannot ask for no right"))
    uri_base = "#{@site()}/oauth/authorize?client_id=#{@api_key}&scope=#{scope}"
    if(@params.uriForTemporaryToken)
      @params.onAskToken.call this, null, "#{uri_base}&redirect_uri=#{@params.uriForTemporaryToken}"
    else
      @params.onAskToken.call this, null, uri_base

  site:()->
    "#{@protocol}://#{@store_name}.myshopify.com/admin"

  registerOAuthToken:(params)->
    if @persistent_token isnt null
      Resource.setOAuthToken @persistent_token
    else if typeof @params.onAskToken == 'function'
      @requestTemporaryAccessToken()
    else
      throw Error("No onAskToken callback defined for getting temporary oauth2 token from Shopify, and no persistent token defined either in session")
      

  getScope:(@scope)->
    types = ['content', 'themes', 'products', 'customers', 'orders', 'script_tags', 'shipping'];
    scope = [];
    @scope = @scope || @params.scope || {};
    for type in types
      continue if !@scope[type]
      @scope[type] = @scope[type].split /[\/,]/ if typeof @scope[type] == 'string'
      if Array.isArray(@scope[type])
        rights = @scope[type].map (right)-> "#{right}_#{type}"
        scope.push rights.join(',')
    return scope.join ','
 
module.exports = SessionOAuth
