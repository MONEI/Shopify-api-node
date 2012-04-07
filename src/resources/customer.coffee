Base = require './base'

class Customer extends Base
	slug: "customer"
	prefix: "/customers"

	constructor: (site) ->
		super(site)



module.exports = Customer
