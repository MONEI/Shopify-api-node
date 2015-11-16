var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('carrier_service');

[
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody',
  'singleResponseBody',
  'allResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Carrier Service', function () {
  it('should create a carrier service', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/carrier_services.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.carrier_service, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.carrier_service);
      next();
    });
  });

  it('should update a carrier service', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;


    scope.put('/admin/carrier_services/962683579.json', reqBody)
      .reply(200, resBody);

    resource.update(962683579, reqBody.carrier_service, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.carrier_service);
      next();
    });
  });

  it('should list carrier services', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/carrier_services.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.carrier_services);
      next();
    });
  });

  it('should get a single carrier service by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/carrier_services/962683576.json')
      .reply(200, resBody);

    resource.get(962683576, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.carrier_service);
      next();
    });
  });

  it('should destroy a carrier service', function (next) {
    scope.delete('/admin/carrier_services/962683575.json')
      .reply(200, {});

    resource.delete(962683575, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(962683575);
      next();
    });
  });
});
