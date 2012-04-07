Base = require './base'

class Product extends Base
	slug: "product"
	prefix: "/products"

	constructor: (site) ->
		@prefix = "#{site}#{@prefix}"



module.exports = Product