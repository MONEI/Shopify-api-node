Base = require './base'

class ScriptTag extends Base
	slug: "script_tag"
	prefix: "/script_tags"

	constructor: (site) ->
		super(site)



module.exports = ScriptTag
