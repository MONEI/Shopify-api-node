BaseChild = require './base_child'
pluralize = require 'pluralize'

class Article extends BaseChild
  parent: "/blogs"
  slug: "article"
  child: "/articles"

  constructor: (site) ->
    super(site)

  all: (blogId, params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "#{@prefix}/#{blogId}/articles", params
    @resource.get url, pluralize(@slug), callback

  count: (blogId, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/count"
    @resource.get url, @slug, callback

  single: (blogId, articleId, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/#{articleId}"
    @resource.get url, @slug, callback

  newArticle: (blogId, fields, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles"
    @resource.post url, @slug, fields, callback

  update: (blogId, articleId, fields, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/#{articleId}"
    @resource.put url, @slug, fields, callback

  authors: (params, callback) ->
    [params, callback] = [callback, params] if typeof params is 'function'
    url = @resource.queryString "/articles/authors"
    @resource.get url, @slug, callback

  tags: (blogId, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/tags"
    @resource.get url, @slug, callback

  deleteArticle: (blogId, fulfillmentId, id, callback) ->
    url = @resource.queryString "#{@prefix}/#{blogId}/articles/#{blogId}"
    @resource.delete url, id, callback

module.exports = Article
