BaseChild = require './base_child'
Metafields = require './metafield'

class ProductImage extends BaseChild
	parent: "/products"
	slug: "image"
	child: "/images"

	constructor: (site) ->
		super(site)


module.exports = ProductImage
