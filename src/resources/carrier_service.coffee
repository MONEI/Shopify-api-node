Base = require './base'
Metafields = require './metafield'

class CarrierService extends Base
	slug: "carrier_services"
	prefix: "/carrier_services"

	constructor: (site) ->
		@metafields = new Metafields(@prefix, site)
		super(site)



module.exports = CarrierService
