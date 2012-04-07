Base = require './base'

class Event extends Base
	slug: "event"
	prefix: "/events"

	constructor: (site) ->
		super(site)



module.exports = Event
