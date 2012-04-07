Base = require './base'

class SmartCollection extends Base
	slug: "smart_collection"
	prefix: "/smart_collections"

	constructor: (site) ->
		super(site)


module.exports = SmartCollection
