BaseChild = require './base_child'
pluralize = require 'pluralize'

class Article extends BaseChild
  parent: "/blogs"
  slug: "article"
  child: "/articles"

  constructor: (site) ->
    super(site)

  authors: (callback) ->
    url = @resource.queryString "/articles/authors"
    @resource.get url, @slug, callback

  tags: (blogId, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/tags", params
    @resource.get url, @slug, callback

module.exports = Article
