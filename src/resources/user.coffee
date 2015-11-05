Base = require './base'

class User extends Base
  slug: "user"
  prefix: "/users"

  constructor: (site) ->
    super(site)

module.exports = User
