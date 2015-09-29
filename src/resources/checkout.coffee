Base = require './base'

class Checkout extends Base
	slug: "checkout"
	prefix: "/checkouts"

	constructor: (site) ->
		super(site)

module.exports = Checkout
