BaseChild = require './base_child'

class Transaction extends BaseChild
	parent: "/orders"
	slug: "transaction"
	child: "/transactions"

	constructor: (site) ->
		super(site)

module.exports = Transaction