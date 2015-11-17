var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

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

describe('Fulfillment Event', function () {
  it('should get a list of all fulfillment events for a fulfillment', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/orders/450789469/fulfillments/255858046/events.json')
      .reply(200, resBody);

    resource.all(450789469, 255858046, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_events);
      next();
    });
  });

  it('should get a single fulfillment event by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/orders/450789469/fulfillments/255858046/events/3.json')
      .reply(200, resBody);

    resource.get(450789469, 255858046, 3, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_event);
      next();
    });
  });

  it('should create a fulfillment event', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/orders/450789469/fulfillments/255858046/events.json', reqBody)
      .reply(201, resBody);

    resource.create(450789469, 255858046, reqBody.event, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_event);
      next();
    });
  });

  it('should update a fulfillment event', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;


    scope.put('/admin/orders/450789469/fulfillments/255858046/events/1.json', reqBody)
      .reply(200, resBody);

    resource.update(450789469, 255858046, 1, reqBody.event, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_event);
      next();
    });
  });

  it('should destroy a fulfillment event', function (next) {
    scope.delete('/admin/orders/450789469/fulfillments/255858046/events/2.json')
      .reply(200, {});

    resource.delete(450789469, 255858046, 2, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(2);
      next();
    });
  });
});
