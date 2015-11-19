Base = require './base'

class CustomerGroup extends Base
  slug: "customer_group"
  prefix: "/customer_groups"

  constructor: (site) ->
    super(site)

  customers: (id, callback) ->
    url = @resource.queryString "#{@prefix}/#{id}/customers"
    @resource.post url, "customers", callback

module.exports = CustomerGroup
