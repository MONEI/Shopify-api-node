BaseDescendant = require './base_descendant'

class Metafield extends BaseDescendant
  slug: 'metafield'

  constructor: (site) ->
    super site

module.exports = Metafield
