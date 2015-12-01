var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('customer');

[
  'allResponseBody',
  'searchResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Customer', function () {
  it('should get a list of all customers', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/customers.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customers);
      next();
    });
  });

  it('should search customers', function (next) {
    var resBody = fixtures.searchResponseBody;

    scope.get('/admin/customers/search.json?query=Bob%20country%3AUnited%20States')
      .reply(200, resBody);

    resource.search({
      query: 'Bob country:United States'
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customers);
      next();
    });
  });

  it('should get a single customer by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/customers/207119551.json')
      .reply(200, resBody);

    resource.get(207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer);
      next();
    });
  });

  it('should create a customer', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/customers.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.customer, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer);
      next();
    });
  });

  it('should update a customer', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;

    scope.put('/admin/customers/207119551.json', reqBody)
      .reply(200, resBody);

    resource.update(207119551, reqBody.customer, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.customer);
      next();
    });
  });

  it('should create an account activation URL', function (next) {
    var url = 'http://apple.myshopify.com/account/activate/207119551/' +
      '2b2856679c9b5dd03984eb4db626929a-1448568012';

    scope.post('/admin/customers/207119551/account_activation_url.json', {
      customer: { id: 207119551 }
    }).reply(201, { account_activation_url: url });

    resource.createActivationUrl(207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(url);
      next();
    });
  });

  it('should remove a customer', function (next) {
    scope.delete('/admin/customers/207119551.json')
      .reply(200, {});

    resource.delete(207119551, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(207119551);
      next();
    });
  });

  it('should get a count of all customers', function (next) {
    scope.get('/admin/customers/count.json')
      .reply(200, { count: 1 });

    resource.count(function (err, res) {
      res.should.be.exactly(1);
      next();
    });
  });
});
