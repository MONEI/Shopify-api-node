var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

common.setObject('asset');

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

describe('Asset', function () {
  it('should get a list of all assets', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/themes/828155753/assets.json')
      .reply(200, resBody);

    resource.all(828155753, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.assets);
      next();
    });
  });

  it('should get a single asset by its key (1/2)', function (next) {
    var resBody = fixtures.singleResponseBody;
    var path = '/admin/themes/828155753/assets.json?' +
      'theme_id=828155753&asset%5Bkey%5D=templates%2Findex.liquid';

    scope.get(path).reply(200, resBody);

    resource.get(828155753, {
      key: 'templates/index.liquid',
      theme_id: 828155753
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should get a single asset by its key (2/2)', function (next) {
    var resBody = fixtures.singleResponseBody;
    var path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=templates%2Findex.liquid&theme_id=828155753';

    scope.get(path).reply(200, resBody);

    resource.get(828155753, {
      asset: { key: 'templates/index.liquid' },
      theme_id: 828155753
    }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should create an asset', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.put('/admin/themes/828155753/assets.json', reqBody)
      .reply(200, resBody);

    resource.create(828155753, reqBody.asset, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should update an asset', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;

    scope.put('/admin/themes/828155753/assets.json', reqBody)
      .reply(200, resBody);

    resource.update(828155753, reqBody.asset, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should remove an asset', function (next) {
    var path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=assets%2Fbg-body.gif';

    scope.delete(path).reply(200, {});

    resource.delete(828155753, 'assets/bg-body.gif', function (err, res) {
      if (err) return next(err);

      res.should.be.exactly('assets/bg-body.gif');
      next();
    });
  });

  it('should error when deleting an assest that cannot be deleted', function (next) {
    var path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=layout%2Ftheme.liquid';

    scope.delete(path).reply(403, {});

    resource.delete(828155753, 'layout/theme.liquid', function (err) {
      err.should.be.an.Error();
      err.message.should.be.exactly('Status code 403');
      next();
    });
  });
});
