'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

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

describe('Carrier Service', () => {
  it('should create a carrier service', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/carrier_services.json', reqBody).reply(201, resBody);
    resource.create(reqBody.carrier_service)
    .then(res => {
      res.body.carrier_service.should.be.eql(resBody.carrier_service);
      done();
    });
  });

  it('should update a carrier service', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/carrier_services/962683579.json', reqBody)
    .reply(200, resBody);
    resource.update(962683579, reqBody.carrier_service)
    .then(res => {
      res.body.carrier_service.should.be.eql(resBody.carrier_service);
      done();
    });
  });

  it('should list carrier services', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/carrier_services.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.carrier_services.should.be.eql(resBody.carrier_services);
      done();
    });
  });

  it('should get a single carrier service by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/carrier_services/962683576.json').reply(200, resBody);
    resource.get(962683576)
    .then(res => {
      res.body.carrier_service.should.be.eql(resBody.carrier_service);
      done();
    });
  });

  it('should destroy a carrier service', done => {
    scope.delete('/admin/carrier_services/962683575.json').reply(200, {});
    resource.delete(962683575)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
