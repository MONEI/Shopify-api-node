Base = require './base'

class RecurringApplicationCharge extends Base 
	slug: "recurring_application_charge"
	prefix: "/recurring_application_charges"

	constructor: (site) ->
		super(site)

	activate: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/activate"
		@resource.post url, @slug, callback



module.exports = RecurringApplicationCharge