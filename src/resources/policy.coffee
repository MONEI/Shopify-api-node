Base = require './base'

class Policy extends Base
  slug: 'policy'
  prefix: '/policies'

  constructor: (site) ->
    super(site)

module.exports = Policy
