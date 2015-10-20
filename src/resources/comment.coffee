Base = require './base'

class Comment extends Base
	slug: "comment"
	prefix: "/comments"

	constructor: (site) ->
		super(site)

	spam: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/spam"
		@resource.post url, "", callback

	notSpam: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/not_spam"
		@resource.post url, "", callback

	approve: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/approve"
		@resource.post url, "", callback

	remove: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/remove"
		@resource.post url, "", callback

	delete: (id, callback) ->
		@remove(id, callback)



module.exports = Comment
