Base = require './base'

class ScriptTags extends Base
	slug: "script_tag"
	prefix: "/script_tags"

	constructor: (site) ->
		super(site)



module.exports = ScriptTags
