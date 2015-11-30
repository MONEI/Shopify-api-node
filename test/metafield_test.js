var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('metafield');

[
  'allStoreResponseBody',
  'allResourceResponseBody',
  'singleStoreResponseBody',
  'singleResourceResponseBody',
  'createRequestBody',
  'createStoreResponseBody',
  'createResourceResponseBody',
  'updateStoreRequestBody',
  'updateStoreResponseBody',
  'updateResourceRequestBody',
  'updateResourceResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Metafield', function () {
  it('should get all metafields that belong to a store (1/2)', function (next) {
    var resBody = fixtures.allStoreResponseBody;

    scope.get('/admin/metafields.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a store (2/2)', function (next) {
    var resBody = fixtures.allStoreResponseBody;

    scope.get('/admin/metafields.json?since_id=721389481')
      .reply(200, resBody);

    resource.all({ since_id: 721389481 }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a resource (1/2)', function (next) {
    var resBody = fixtures.allResourceResponseBody;

    scope.get('/admin/products/632910392/metafields.json')
      .reply(200, resBody);

    resource.all({
      resource: 'product',
      id: 632910392
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a resource (2/2)', function (next) {
    var resBody = fixtures.allResourceResponseBody;

    scope.get('/admin/products/632910392/metafields.json?since_id=721389481')
      .reply(200, resBody);

    resource.all({
      resource: 'product',
      id: 632910392
    }, {
      since_id: 721389481
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get a count of all metafields for a store (1/2)', function (next) {
    scope.get('/admin/metafields/count.json')
      .reply(200, { count: 1 });

    resource.count(function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a store (2/2)', function (next) {
    scope.get('/admin/metafields/count.json?since_id=721389481')
      .reply(200, { count: 1 });

    resource.count({ since_id: 721389481 }, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a resource (1/2)', function (next) {
    scope.get('/admin/products/632910392/metafields/count.json')
      .reply(200, { count: 1 });

    resource.count({
      resource: 'product',
      id: 632910392
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a resource (2/2)', function (next) {
    scope.get('/admin/products/632910392/metafields/count.json?since_id=721389481')
      .reply(200, { count: 1 });

    resource.count({
      resource: 'product',
      id: 632910392
    }, {
      since_id: 721389481
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(1);
      next();
    });
  });

  it('should get a single store metafield by its ID (1/2)', function (next) {
    var resBody = fixtures.singleStoreResponseBody;

    scope.get('/admin/metafields/721389482.json')
      .reply(200, resBody);

    resource.get(721389482, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single store metafield by its ID (2/2)', function (next) {
    var resBody = fixtures.singleStoreResponseBody;

    scope.get('/admin/metafields/721389482.json?foo=bar')
      .reply(200, resBody);

    resource.get(721389482, { foo: 'bar' }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single resource metafield by its ID (1/2)', function (next) {
    var resBody = fixtures.singleResourceResponseBody;

    scope.get('/admin/products/632910392/metafields/845366454.json')
      .reply(200, resBody);

    resource.get({
      resource: 'product',
      id: 632910392
    }, 845366454, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single resource metafield by its ID (2/2)', function (next) {
    var resBody = fixtures.singleResourceResponseBody;

    scope.get('/admin/products/632910392/metafields/845366454.json?foo=bar')
      .reply(200, resBody);

    resource.get({
      resource: 'product',
      id: 632910392
    }, 845366454, {
      foo: 'bar'
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should create a new metafield for a store', function (next) {
    var resBody = fixtures.createStoreResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/metafields.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.metafield, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should error when creating a metafield without a key', function (next) {
    var reqBody = {
      metafield: { key: null }
    };

    scope.post('/admin/metafields.json', reqBody)
      .reply(422);

    resource.create(reqBody.metafield, function (err) {
      err.should.be.an.Error();
      err.message.should.be.exactly('Status code 422');
      next();
    });
  });

  it('should create a new metafield for a resource', function (next) {
    var resBody = fixtures.createResourceResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/products/632910392/metafields.json', reqBody)
      .reply(201, resBody);

    resource.create({
      resource: 'product',
      id: 632910392
    }, reqBody.metafield, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should update a store metafield', function (next) {
    var resBody = fixtures.updateStoreResponseBody
      , reqBody = fixtures.updateStoreRequestBody;

    scope.put('/admin/metafields/721389482.json', reqBody)
      .reply(200, resBody);

    resource.update(721389482, reqBody.metafield, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should update a resource metafield', function (next) {
    var resBody = fixtures.updateResourceResponseBody
      , reqBody = fixtures.updateResourceRequestBody;

    scope.put('/admin/products/632910392/metafields/845366454.json', reqBody)
      .reply(200, resBody);

    resource.update({
      resource: 'product',
      id: 632910392
    }, 845366454, reqBody.metafield, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should delete a store metafield', function (next) {
    scope.delete('/admin/metafields/721389482.json')
      .reply(200, {});

    resource.delete(721389482, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(721389482);
      next();
    });
  });

  it('should delete a resource metafield', function (next) {
    scope.delete('/admin/products/632910392/metafields/845366454.json')
      .reply(200, {});

    resource.delete({
      resource: 'product',
      id: 632910392
    }, 845366454, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(845366454);
      next();
    });
  });
});
