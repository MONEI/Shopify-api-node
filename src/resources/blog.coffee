resource = require '../resource'

class Blog
  prefix: "/blogs"
  format: "json"
  constructor: (site) ->
    @prefix = "#{site}#{@prefix}"

  all: (params, callback) ->
        
    if typeof params is 'function'
      callback = params
      params = null

    url = resource.queryString @prefix, params
    console.log url
    resource.get url, callback

                                                                                                                 
  count: (cb, path = '/blogs/count.json')->
    @__get__ path, cb

  get: (id, cb) ->
    throw new Error 'missing id' unless id?
    @__get__ "/blogs/#{id}.json", cb

  create: (title, metas, cb, path = '/blogs.json') ->
    throw new Error 'missing title' unless title?

    if typeof metas is 'function'
      cb = metas
      metas = null

    body =
      blog:
        title: title
    body.blog.metafields = metas if metas?

    @__post__ path, body, cb

  update: (id, field, cb) ->
    throw new Error 'missing params' if !id? or !field?
    
    body =
      blog:
        id: id
    if typeof field is 'string' then body.blog.title = field else body.blog.metafields = field

    @__update__ "/blogs/#{id}.json", body, cb


module.exports = Blog
