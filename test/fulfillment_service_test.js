var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('fulfillment_service');

[
  'allScopeAllResponseBody',
  'allResponseBody',
  'createRequestBody',
  'createResponseBody',
  'singleResponseBody',
  'updateRequestBody',
  'updateResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Fulfillment Service', function () {
  it('should list all of the shop\'s fulfillment services', function (next) {
    var resBody = fixtures.allScopeAllResponseBody;

    scope.get('/admin/fulfillment_services.json?scope=all')
      .reply(200, resBody);

    resource.all({ scope: 'all' }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_services);
      next();
    });
  });

  it('should list apps\'s fulfillment services', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/fulfillment_services.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_services);
      next();
    });
  });

  it('should create a fulfillment service', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/fulfillment_services.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.fulfillment_service, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_service);
      next();
    });
  });

  it('should get a single fulfillment service by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/fulfillment_services/755357713.json')
      .reply(200, resBody);

    resource.get(755357713, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_service);
      next();
    });
  });

  it('should update a fulfillment service', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;


    scope.put('/admin/fulfillment_services/755357713.json', reqBody)
      .reply(200, resBody);

    resource.update(755357713, reqBody.fulfillment_service, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.fulfillment_service);
      next();
    });
  });

  it('should destroy a fulfillment service', function (next) {
    scope.delete('/admin/fulfillment_services/755357713.json')
      .reply(200, {});

    resource.delete(755357713, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(755357713);
      next();
    });
  });
});
