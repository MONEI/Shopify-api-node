'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('event');

[
  'allStoreResponseBody',
  'allStoreQueryResponseBody',
  'allResourceResponseBody',
  'allResourceQueryResponseBody',
  'singleResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Event', () => {
  it('should get all events that belong to a store (1/2)', next => {
    let resBody = fixtures.allStoreResponseBody;
    scope.get('/admin/events.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.events.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a store (2/2)', next => {
    let resBody = fixtures.allStoreQueryResponseBody;
    scope.get('/admin/events.json?since_id=164748010').reply(200, resBody);
    resource.all({ since_id: 164748010 })
    .then(res => {
      res.body.events.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a resource (1/2)', next => {
    let resBody = fixtures.allResourceResponseBody;
    scope.get('/admin/products/921728736/events.json').reply(200, resBody);
    resource.all({
      resource: 'product',
      id: 921728736
    })
    .then(res => {
      res.body.events.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a resource (2/2)', next => {
    let resBody = fixtures.allResourceQueryResponseBody;
    scope.get('/admin/orders/450789469/events.json?limit=1&page=2')
    .reply(200, resBody);
    resource.all({
      resource: 'order',
      id: 450789469
    }, {
      limit: 1,
      page: 2
    })
    .then(res => {
      res.body.events.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get an event by its ID (1/2)', next => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/events/677313116.json').reply(200, resBody);
    resource.get(677313116)
    .then(res => {
      res.body.event.should.be.eql(resBody.event);
      next();
    });
  });

  it('should get an event by its ID (2/2)', next => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/events/677313116.json?foo=bar').reply(200, resBody);
    resource.get(677313116, { foo: 'bar' })
    .then(res => {
      res.body.event.should.be.eql(resBody.event);
      next();
    });
  });

  it('should count all the events (1/2)', next => {
    scope.get('/admin/events/count.json').reply(200, { count: 3 });
    resource.count()
    .then(res => {
      res.body.count.should.be.exactly(3);
      next();
    });
  });

  it('should count all the events (2/2)', next => {
    scope.get('/admin/events/count.json?created_at_min=2007-12-31%2021%3A00%3A00')
    .reply(200, { count: 1 });
    resource.count({
      created_at_min: '2007-12-31 21:00:00'
    })
    .then(res => {
      res.body.count.should.be.exactly(1);
      next();
    });
  });

});
