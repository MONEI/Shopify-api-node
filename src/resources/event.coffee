BaseDescendant = require './base_descendant'

class Event extends BaseDescendant
  slug: 'event'

  constructor: (site) ->
    super site

module.exports = Event
