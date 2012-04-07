BaseChild = require './base_child'
Metafields = require './metafield'

class Province extends BaseChild
	parent: "/countries"
	slug: "province"
	child: "/provinces"

	constructor: (site) ->
		super(site)


module.exports = Province
