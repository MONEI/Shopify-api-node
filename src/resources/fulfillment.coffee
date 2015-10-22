BaseChild = require './base_child'

class Fulfillment extends BaseChild
	parent: "/orders"
	slug: "fulfillment"
	child: "/fulfillments"

	constructor: (site) ->
		super(site)

	complete: (orderId, id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{id}/complete"
		@resource.post url, @slug, callback

	cancel: (orderId, id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{id}/cancel"
		@resource.post url, @slug, callback

	delete: (orderId, id, callback) ->
		@cancel(orderId, id, callback)

module.exports = Fulfillment
