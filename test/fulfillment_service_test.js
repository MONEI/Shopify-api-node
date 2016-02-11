'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

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

describe('Fulfillment Service', () => {
  it('should list all of the shop\'s fulfillment services', done => {
    let resBody = fixtures.allScopeAllResponseBody;
    scope.get('/admin/fulfillment_services.json?scope=all')
    .reply(200, resBody);
    resource.all({ scope: 'all' })
    .then(res => {
      res.body.fulfillment_services
      .should.be.eql(resBody.fulfillment_services);
      done();
    });
  });

  it('should list apps\'s fulfillment services', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/fulfillment_services.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.fulfillment_services
      .should.be.eql(resBody.fulfillment_services);
      done();
    });
  });

  it('should create a fulfillment service', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/fulfillment_services.json', reqBody)
    .reply(201, resBody);
    resource.create(reqBody.fulfillment_service)
    .then(res => {
      res.body.fulfillment_service
      .should.be.eql(resBody.fulfillment_service);
      done();
    });
  });

  it('should get a single fulfillment service by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/fulfillment_services/755357713.json')
    .reply(200, resBody);
    resource.get(755357713)
    .then(res => {
      res.body.fulfillment_service
      .should.be.eql(resBody.fulfillment_service);
      done();
    });
  });

  it('should update a fulfillment service', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/fulfillment_services/755357713.json', reqBody)
    .reply(200, resBody);
    resource.update(755357713, reqBody.fulfillment_service)
    .then(res => {
      res.body.fulfillment_service
      .should.be.eql(resBody.fulfillment_service);
      done();
    });
  });

  it('should destroy a fulfillment service', done => {
    scope.delete('/admin/fulfillment_services/755357713.json').reply(200, {});
    resource.delete(755357713)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
