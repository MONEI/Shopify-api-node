BaseChild = require './base_child'
Metafields = require './metafield'

class OrderRisk extends BaseChild
	parent: "/orders"
	slug: "risk"
	child: "/risks"

	constructor: (site) ->
		super(site)


module.exports = OrderRisk
