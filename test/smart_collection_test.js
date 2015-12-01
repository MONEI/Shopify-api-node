var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('smart_collection');

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

describe('Smart Collection', function () {
  it('should list all smart collections', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/smart_collections.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.smart_collections);
      next();
    });
  });

  it('should get a count of all smart collections', function (next) {
    scope.get('/admin/smart_collections/count.json')
      .reply(200, { count: 1 });

    resource.count(function (err, res) {
      res.should.be.exactly(1);
      next();
    });
  });

  it('should get a single smart collection by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/smart_collections/482865238.json')
      .reply(200, resBody);

    resource.get(482865238, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.smart_collection);
      next();
    });
  });

  it('should create a smart collection', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/smart_collections.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.smart_collection, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.smart_collection);
      next();
    });
  });

  it('should update a smart collection', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;

    scope.put('/admin/smart_collections/482865238.json', reqBody)
      .reply(200, resBody);

    resource.update(482865238, reqBody.smart_collection, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.smart_collection);
      next();
    });
  });

  it('should set the ordering type in a smart collection', function (next) {
    var path = '/admin/smart_collections/482865238/order.json' +
      '?sort_order=alpha-desc';

    scope.put(path).reply(200, {});

    resource.order(482865238, {
      sort_order: 'alpha-desc'
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.an.Object();
      res.should.be.empty();
      next();
    });
  });

  it('should set the manual order of products in a smart collection', function (next) {
    var path = '/admin/smart_collections/482865238/order.json' +
      '?products%5B%5D=921728736&products%5B%5D=632910392';

    scope.put(path).reply(200, {});

    resource.order(482865238, {
      products: [921728736, 632910392]
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.an.Object();
      res.should.be.empty();
      next();
    });
  });

  it('should remove a smart collection', function (next) {
    scope.delete('/admin/smart_collections/482865238.json')
      .reply(200, {});

    resource.delete(482865238, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(482865238);
      next();
    });
  });
});
