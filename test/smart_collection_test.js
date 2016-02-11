'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

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

describe('Smart Collection', () => {
  it('should list all smart collections', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/smart_collections.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.smart_collections.should.be.eql(resBody.smart_collections);
      done();
    });
  });

  it('should get a count of all smart collections', done => {
    scope.get('/admin/smart_collections/count.json').reply(200, { count: 1 });
    resource.count()
    .then(res => {
      res.body.count.should.be.exactly(1);
      done();
    });
  });

  it('should get a single smart collection by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/smart_collections/482865238.json').reply(200, resBody);
    resource.get(482865238)
    .then(res => {
      res.body.smart_collection.should.be.eql(resBody.smart_collection);
      done();
    });
  });

  it('should create a smart collection', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/smart_collections.json', reqBody).reply(201, resBody);
    resource.create(reqBody.smart_collection)
    .then(res => {
      res.body.smart_collection.should.be.eql(resBody.smart_collection);
      done();
    });
  });

  it('should update a smart collection', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/smart_collections/482865238.json', reqBody)
    .reply(200, resBody);
    resource.update(482865238, reqBody.smart_collection)
    .then(res => {
      res.body.smart_collection.should.be.eql(resBody.smart_collection);
      done();
    });
  });

  it('should set the ordering type in a smart collection', done => {
    let path = '/admin/smart_collections/482865238/order.json' +
      '?sort_order=alpha-desc';
    scope.put(path).reply(200, {});
    resource.order(482865238, {
      sort_order: 'alpha-desc'
    })
    .then(res => {
      res.body.should.be.an.Object();
      res.body.should.be.empty();
      done();
    });
  });

  it('should set the manual order of products in a smart collection', done => {
    let path = '/admin/smart_collections/482865238/order.json' +
      '?products%5B%5D=921728736&products%5B%5D=632910392';
    scope.put(path).reply(200, {});
    resource.order(482865238, {
      products: [921728736, 632910392]
    })
    .then(res => {
      res.body.should.be.an.Object();
      res.body.should.be.empty();
      done();
    });
  });

  it('should remove a smart collection', done => {
    scope.delete('/admin/smart_collections/482865238.json') .reply(200, {});
    resource.delete(482865238)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
