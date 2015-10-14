BaseChild = require './base_child'
Metafields = require './metafield'

class CustomerAddress extends BaseChild
	parent: "/customers"
	# Because the slug/plural for address is address'e's
	slug: "addresse"
	child: "/addresses"

	constructor: (site) ->
		super(site)


module.exports = CustomerAddress
