Base = require './base'

class ApplicationCharge extends Base 
	slug: "application_charge"
	prefix: "/application_charges"

	constructor: (site) ->
		super(site)

	activate: (id, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/activate"
		@resource.post url, @slug, callback



module.exports = ApplicationCharge