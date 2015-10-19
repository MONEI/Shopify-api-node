Base = require './base'

class ApplicationCharge extends Base
	slug: "application_charge"
	prefix: "/application_charges"

	constructor: (site) ->
		super(site)

	activate: (id, fields, callback) ->
		callback new Error 'missing id' unless id?
		url = @resource.queryString "#{@prefix}/#{id}/activate"
		@resource.post url, @slug, fields, callback



module.exports = ApplicationCharge
