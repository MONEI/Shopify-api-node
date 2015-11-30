var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

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

describe('Event', function () {
  it('should get all events that belong to a store (1/2)', function (next) {
    var resBody = fixtures.allStoreResponseBody;

    scope.get('/admin/events.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a store (2/2)', function (next) {
    var resBody = fixtures.allStoreQueryResponseBody;

    scope.get('/admin/events.json?since_id=164748010')
      .reply(200, resBody);

    resource.all({ since_id: 164748010 }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a resource (1/2)', function (next) {
    var resBody = fixtures.allResourceResponseBody;

    scope.get('/admin/products/921728736/events.json')
      .reply(200, resBody);

    resource.all({
      resource: 'product',
      id: 921728736
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get all events that belong to a resource (2/2)', function (next) {
    var resBody = fixtures.allResourceQueryResponseBody;

    scope.get('/admin/orders/450789469/events.json?limit=1&page=2')
      .reply(200, resBody);

    resource.all({
      resource: 'order',
      id: 450789469
    }, {
      limit: 1,
      page: 2
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.events);
      next();
    });
  });

  it('should get an event by its ID (1/2)', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/events/677313116.json')
      .reply(200, resBody);

    resource.get(677313116, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.event);
      next();
    });
  });

  it('should get an event by its ID (2/2)', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/events/677313116.json?foo=bar')
      .reply(200, resBody);

    resource.get(677313116, { foo: 'bar' }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.event);
      next();
    });
  });

  it('should count all the events (1/2)', function (next) {
    scope.get('/admin/events/count.json')
      .reply(200, { count: 3 });

    resource.count(function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(3);
      next();
    });
  });

  it('should count all the events (2/2)', function (next) {
    scope.get('/admin/events/count.json?created_at_min=2007-12-31%2021%3A00%3A00')
      .reply(200, { count: 1 });

    resource.count({
      created_at_min: '2007-12-31 21:00:00'
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(1);
      next();
    });
  });
});
