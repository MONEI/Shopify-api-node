Base = require './base'

class ShippingZone extends Base
  slug: 'shipping_zone'
  prefix: '/shipping_zones'

  constructor: (site) ->
    super(site)

module.exports = ShippingZone
