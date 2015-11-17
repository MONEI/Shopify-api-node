BaseChild = require './base_child'
pluralize = require 'pluralize'

class FulfillmentEvent extends BaseChild
  parent: '/orders'
  slug:
    long: 'fulfillment_event'
    short: 'event'
  child: '/fulfillments'

  constructor: (site) ->
    super(site)

  all: (orderId, fulfillmentId, callback) ->
    url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{fulfillmentId}/events"
    @resource.get url, pluralize(@slug.long), callback

  get: (orderId, fulfillmentId, id, callback) ->
    url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{fulfillmentId}/events/#{id}"
    @resource.get url, @slug.long, callback

  create: (orderId, fulfillmentId, fields, callback) ->
    url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{fulfillmentId}/events"
    @resource.post url, @slug, fields, callback

  update: (orderId, fulfillmentId, id, fields, callback) ->
    url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{fulfillmentId}/events/#{id}"
    @resource.put url, @slug, fields, callback

  delete: (orderId, fulfillmentId, id, callback) ->
    url = @resource.queryString "#{@prefix}/#{orderId}#{@child}/#{fulfillmentId}/events/#{id}"
    @resource.delete url, id, callback

module.exports = FulfillmentEvent
