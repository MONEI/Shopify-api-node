var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('customer_address');

[
  'allResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody',
  'defaultResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Customer Address', function () {
  it('should retrieve all addresses for a customer', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/customers/207119551/addresses.json')
      .reply(200, resBody);

    resource.all(207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.addresses);
      next();
    });
  });

  it('should retrieve details for one of a customers addresses', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/customers/207119551/addresses/207119551.json')
      .reply(200, resBody);

    resource.get(207119551, 207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer_address);
      next();
    });
  });

  it('should create a new address for a customer', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/customers/207119551/addresses.json', reqBody)
      .reply(201, resBody);

    resource.create(207119551, reqBody.address, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer_address);
      next();
    });
  });

  it('should update the values on an existing customer address', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;

    scope.put('/admin/customers/207119551/addresses/207119551.json', reqBody)
      .reply(200, resBody);

    resource.update(207119551, 207119551, reqBody.address, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer_address);
      next();
    });
  });

  it('should remove an address from the customers address list', function (next) {
    scope.delete('/admin/customers/207119551/addresses/207119551.json')
      .reply(200, {});

    resource.delete(207119551, 207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(207119551);
      next();
    });
  });

  it('should destroy multiple customer addresses', function (next) {
    var path = '/admin/customers/207119551/addresses/set.json' +
      '?address_ids%5B%5D=1053317300&operation=destroy';

    scope.put(path, {}).reply(200, {});

    resource.set(207119551, {
      address_ids: [1053317300],
      operation: 'destroy'
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.an.Object();
      res.should.be.empty();
      next();
    });
  });

  it('should assign a new default address to a customer', function (next) {
    var path = '/admin/customers/207119551/addresses/1053317297/default.json'
      , resBody = fixtures.defaultResponseBody;

    scope.put(path, {}).reply(200, resBody);

    resource.default(207119551, 1053317297, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer_address);
      next();
    });
  });
});
