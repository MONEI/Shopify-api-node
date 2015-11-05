Base = require './base'
class GiftCard extends Base
  slug: 'gift_card'
  prefix: '/gift_cards'
  constructor: (site) ->
    super(site)

  getAll: (callback) ->
    @all(callback)

  checkValidStatus: (status, callback) ->
    callback new Error 'status is not valid' unless !!~["disabled", "enabled"].indexOf(status)

  getByStatus: (status, callback) ->
    @checkValidStatus(status, callback)
    @all({status:status}, callback)

  getCount: (callback) ->
    @count(undefined, callback)

  getCountByStatus: (status, callback) ->
    @checkValidStatus(status, callback)
    @count({status: status}, callback)


module.exports = GiftCard
