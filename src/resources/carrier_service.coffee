Base = require './base'

class CarrierService extends Base
  slug: "carrier_service"
  prefix: "/carrier_services"

  constructor: (site) ->
    super(site)

module.exports = CarrierService
