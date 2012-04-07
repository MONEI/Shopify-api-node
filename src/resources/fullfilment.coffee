BaseChild = require './base_child'

class Fulfillment extends BaseChild
	parent: "/order"
	slug: "fulfillment"
	child: "/fulfillments"

	constructor: (site) ->
		super(site)

	cancel: (orderId, id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{parentId}#{@child}/#{id}"
		@resource.post url, @slug, callback

	delete: (orderId, id, callback) ->
		@cancel(orderId, id, callback)

module.exports = Fulfillment