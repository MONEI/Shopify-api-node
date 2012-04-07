Base = require './base'

class Cart extends Base
	slug: "cart"
	prefix: "/carts"

	constructor: (site) ->
		super(site)



module.exports = Cart