Base = require './base'

class FulfillmentService extends Base
  slug: "fulfillment_service"
  prefix: "/fulfillment_services"

  constructor: (site) ->
    super(site)

module.exports = FulfillmentService
