'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('fulfillment_event');

[
  'allResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Fulfillment Event', () => {
  it('should get a list of all fulfillment events for a fulfillment', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/orders/450789469/fulfillments/255858046/events.json')
    .reply(200, resBody);
    resource.all(450789469, 255858046)
    .then(res => {
      res.body.fulfillment_events.should.be.eql(resBody.fulfillment_events);
      done();
    });
  });

  it('should get a single fulfillment event by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/orders/450789469/fulfillments/255858046/events/3.json')
    .reply(200, resBody);
    resource.get(450789469, 255858046, 3)
    .then(res => {
      res.body.fulfillment_event.should.be.eql(resBody.fulfillment_event);
      done();
    });
  });

  it('should create a fulfillment event', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/orders/450789469/fulfillments/255858046/events.json', reqBody)
    .reply(201, resBody);
    resource.create(450789469, 255858046, reqBody.event)
    .then(res => {
      res.body.fulfillment_event.should.be.eql(resBody.fulfillment_event);
      done();
    });
  });

  it('should update a fulfillment event', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/orders/450789469/fulfillments/255858046/events/1.json', reqBody)
    .reply(200, resBody);
    resource.update(450789469, 255858046, 1, reqBody.event)
    .then(res => {
      res.body.fulfillment_event.should.be.eql(resBody.fulfillment_event);
      done();
    });
  });

  it('should destroy a fulfillment event', done => {
    scope.delete('/admin/orders/450789469/fulfillments/255858046/events/2.json')
    .reply(200, {});
    resource.delete(450789469, 255858046, 2)
    .then(res => {
      res.statusCode.should.be.eql(200);
      done();
    });
  });

});
