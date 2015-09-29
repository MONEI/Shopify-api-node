BaseChild = require './base_child'
Metafields = require './metafield'

class Refund extends BaseChild
	parent: "/orders"
	slug: "refund"
	child: "/refunds"

	constructor: (site) ->
		super(site)


module.exports = Refund
