'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('discount');

[
  'createRequestBody',
  'createResponseBody',
  'allResponseBody',
  'singleResponseBody',
  'disableResponseBody',
  'enableResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Discount', function () {
  it('should create a discount', function (next) {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/discounts.json', reqBody).reply(201, resBody);
    resource.create(reqBody.discount)
    .then(res => {
      res.body.discount.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should list all discounts', function (next) {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/discounts.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.discounts.should.be.eql(resBody.discounts);
      next();
    });
  });

  it('should disable a discount', function (next) {
    let resBody = fixtures.disableResponseBody;
    scope.post('/admin/discounts/680866/disable.json').reply(201, resBody);
    resource.disable(680866)
    .then(res => {
      res.body.discount.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should enable a discount', function (next) {
    let resBody = fixtures.enableResponseBody;
    scope.post('/admin/discounts/949676421/enable.json').reply(201, resBody);
    resource.enable(949676421)
    .then(res => {
      res.body.discount.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should get a single discount by its ID', function (next) {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/discounts/680866.json').reply(200, resBody);
    resource.get(680866)
    .then(res => {
      res.body.discount.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should destroy a discount', function (next) {
    scope.delete('/admin/discounts/680866.json').reply(200, {});
    resource.delete(680866)
    .then(res => {
      res.statusCode.should.be.eql(200);
      next();
    });
  });

});
