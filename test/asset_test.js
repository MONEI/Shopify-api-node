'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

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

describe('Asset', () => {

  it('should get a list of all assets', next => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/themes/828155753/assets.json').reply(200, resBody);
    resource.all(828155753)
    .then(res => {
      res.body.assets.should.be.eql(resBody.assets);
      next();
    });
  });

  it('should get a single asset by its key (1/2)', next => {
    let resBody = fixtures.singleResponseBody;
    let path = '/admin/themes/828155753/assets.json?' +
      'theme_id=828155753&asset%5Bkey%5D=templates%2Findex.liquid';
    scope.get(path).reply(200, resBody);
    resource.get(828155753, {
      key: 'templates/index.liquid',
      theme_id: 828155753
    })
    .then(res => {
      res.body.asset.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should get a single asset by its key (2/2)', next => {
    let resBody = fixtures.singleResponseBody;
    let path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=templates%2Findex.liquid&theme_id=828155753';
    scope.get(path).reply(200, resBody);
    resource.get(828155753, {
      asset: { key: 'templates/index.liquid' },
      theme_id: 828155753
    })
    .then(res => {
      res.body.asset.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should create an asset', next => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.put('/admin/themes/828155753/assets.json', reqBody)
    .reply(200, resBody);
    resource.create(828155753, reqBody.asset)
    .then(res => {
      res.body.asset.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should update an asset', next => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/themes/828155753/assets.json', reqBody)
    .reply(200, resBody);
    resource.update(828155753, reqBody.asset)
    .then(res => {
      res.body.asset.should.be.eql(resBody.asset);
      next();
    });
  });

  it('should remove an asset', next => {
    let path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=assets%2Fbg-body.gif';
    scope.delete(path).reply(200, {});
    resource.delete(828155753, 'assets/bg-body.gif')
    .then(res => {
      res.statusCode.should.equal(200);
      next();
    });
  });

  it('should error when deleting an assest that cannot be deleted', next => {
    let path = '/admin/themes/828155753/assets.json?' +
      'asset%5Bkey%5D=layout%2Ftheme.liquid';
    scope.delete(path).reply(403, {});
    resource.delete(828155753, 'layout/theme.liquid')
    .then(res => {
      res.statusCode.should.equal(403);
      next();
    });
  });

});
