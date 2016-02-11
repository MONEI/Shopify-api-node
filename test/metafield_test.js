'use strict';
let common = require('./common.js')
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

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

describe('Metafield', () => {
  it('should get all metafields that belong to a store (1/2)', next => {
    let resBody = fixtures.allStoreResponseBody;
    scope.get('/admin/metafields.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.metafields.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a store (2/2)', next => {
    let resBody = fixtures.allStoreResponseBody;
    scope.get('/admin/metafields.json?since_id=721389481').reply(200, resBody);
    resource.all({ since_id: 721389481 })
    .then(res => {
      res.body.metafields.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a resource (1/2)', next => {
    let resBody = fixtures.allResourceResponseBody;
    scope.get('/admin/products/632910392/metafields.json').reply(200, resBody);
    resource.all({
      resource: 'product',
      id: 632910392
    })
    .then(res => {
      res.body.metafields.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get all metafields that belong to a resource (2/2)', next => {
    let resBody = fixtures.allResourceResponseBody;
    scope.get('/admin/products/632910392/metafields.json?since_id=721389481')
    .reply(200, resBody);
    resource.all({
      resource: 'product',
      id: 632910392
    }, {
      since_id: 721389481
    })
    .then(res => {
      res.body.metafields.should.be.eql(resBody.metafields);
      next();
    });
  });

  it('should get a count of all metafields for a store (1/2)', next => {
    scope.get('/admin/metafields/count.json').reply(200, { count: 1 });
    resource.count()
    .then(res => {
      res.body.count.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a store (2/2)', next => {
    scope.get('/admin/metafields/count.json?since_id=721389481')
    .reply(200, { count: 1 });
    resource.count({ since_id: 721389481 })
    .then(res => {
      res.body.count.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a resource (1/2)', next => {
    scope.get('/admin/products/632910392/metafields/count.json')
    .reply(200, { count: 1 });
    resource.count({
      resource: 'product',
      id: 632910392
    })
    .then(res => {
      res.body.count.should.be.exactly(1);
      next();
    });
  });

  it('should get a count of all metafields for a resource (2/2)', next => {
    scope.get('/admin/products/632910392/metafields/count.json?since_id=721389481')
    .reply(200, { count: 1 });
    resource.count({
      resource: 'product',
      id: 632910392
    }, {
      since_id: 721389481
    })
    .then(res => {
      res.body.count.should.be.exactly(1);
      next();
    });
  });

  it('should get a single store metafield by its ID (1/2)', next => {
    let resBody = fixtures.singleStoreResponseBody;
    scope.get('/admin/metafields/721389482.json').reply(200, resBody);
    resource.get(721389482)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single store metafield by its ID (2/2)', next => {
    let resBody = fixtures.singleStoreResponseBody;
    scope.get('/admin/metafields/721389482.json?foo=bar').reply(200, resBody);
    resource.get(721389482, { foo: 'bar' })
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single resource metafield by its ID (1/2)', next => {
    let resBody = fixtures.singleResourceResponseBody;
    scope.get('/admin/products/632910392/metafields/845366454.json')
    .reply(200, resBody);
    resource.get({
      resource: 'product',
      id: 632910392
    }, 845366454)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should get a single resource metafield by its ID (2/2)', next => {
    let resBody = fixtures.singleResourceResponseBody;
    scope.get('/admin/products/632910392/metafields/845366454.json?foo=bar')
    .reply(200, resBody);
    resource.get({
      resource: 'product',
      id: 632910392
    }, 845366454, {
      foo: 'bar'
    })
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should create a new metafield for a store', next => {
    let resBody = fixtures.createStoreResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/metafields.json', reqBody).reply(201, resBody);
    resource.create(reqBody.metafield)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should error when creating a metafield without a key', next => {
    let reqBody = {metafield: { key: null }};
    scope.post('/admin/metafields.json', reqBody).reply(422);
    resource.create(reqBody.metafield)
    .then(res => {
      res.statusCode.should.be.exactly(422);
      next();
    });
  });

  it('should create a new metafield for a resource', next => {
    let resBody = fixtures.createResourceResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/products/632910392/metafields.json', reqBody)
    .reply(201, resBody);
    resource.create({
      resource: 'product',
      id: 632910392
    }, reqBody.metafield)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should update a store metafield', next => {
    let resBody = fixtures.updateStoreResponseBody;
    let reqBody = fixtures.updateStoreRequestBody;
    scope.put('/admin/metafields/721389482.json', reqBody).reply(200, resBody);
    resource.update(721389482, reqBody.metafield)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should update a resource metafield', next => {
    let resBody = fixtures.updateResourceResponseBody;
    let reqBody = fixtures.updateResourceRequestBody;
    scope.put('/admin/products/632910392/metafields/845366454.json', reqBody)
    .reply(200, resBody);
    resource.update({
      resource: 'product',
      id: 632910392
    }, 845366454, reqBody.metafield)
    .then(res => {
      res.body.metafield.should.be.eql(resBody.metafield);
      next();
    });
  });

  it('should delete a store metafield', next => {
    scope.delete('/admin/metafields/721389482.json').reply(200, {});
    resource.delete(721389482)
    .then(res => {
      res.statusCode.should.eql(200);
      next();
    });
  });

  it('should delete a resource metafield', next => {
    scope.delete('/admin/products/632910392/metafields/845366454.json')
    .reply(200, {});
    resource.delete({
      resource: 'product',
      id: 632910392
    }, 845366454)
    .then(res => {
      res.statusCode.should.eql(200);
      next();
    });
  });

});
