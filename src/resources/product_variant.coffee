BaseChild = require './base_child'
Metafields = require './metafield'

class ProductVariant extends BaseChild
	parent: "/products"
	slug: "variant"
	child: "/variants"

	constructor: (site) ->
		super(site)


module.exports = ProductVariant


