'use strict';
let common = require('./common.js')
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('customer_address');

[
  'allResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody',
  'defaultResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Customer Address', () => {
  it('should retrieve all addresses for a customer', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/customers/207119551/addresses.json').reply(200, resBody);
    resource.all(207119551)
    .then(res => {
      res.body.addresses.should.be.eql(resBody.addresses);
      done();
    });
  });

  it('should retrieve details for one of a customers addresses', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/customers/207119551/addresses/207119551.json')
    .reply(200, resBody);
    resource.get(207119551, 207119551)
    .then(res => {
      res.body.customer_address.should.be.eql(resBody.customer_address);
      done();
    });
  });

  it('should create a new address for a customer', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/customers/207119551/addresses.json', reqBody)
    .reply(201, resBody);
    resource.create(207119551, reqBody.address)
    .then(res => {
      res.body.customer_address.should.be.eql(resBody.customer_address);
      done();
    });
  });

  it('should update the values on an existing customer address', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/customers/207119551/addresses/207119551.json', reqBody)
    .reply(200, resBody);
    resource.update(207119551, 207119551, reqBody.address)
    .then(res => {
      res.body.customer_address.should.be.eql(resBody.customer_address);
      done();
    });
  });

  it('should remove an address from the customers address list', done => {
    scope.delete('/admin/customers/207119551/addresses/207119551.json')
    .reply(200, {});
    resource.delete(207119551, 207119551)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

  it('should destroy multiple customer addresses', done => {
    let path = '/admin/customers/207119551/addresses/set.json' +
      '?address_ids%5B%5D=1053317300&operation=destroy';
    scope.put(path, {}).reply(200, {});
    resource.set(207119551, {
      address_ids: [1053317300],
      operation: 'destroy'
    })
    .then(res => {
      res.body.should.be.an.Object();
      res.body.should.be.empty();
      done();
    });
  });

  it('should assign a new default address to a customer', done => {
    let path = '/admin/customers/207119551/addresses/1053317297/default.json';
    let resBody = fixtures.defaultResponseBody;
    scope.put(path, {}).reply(200, resBody);
    resource.default(207119551, 1053317297)
    .then(res => {
      res.body.customer_address.should.be.eql(resBody.customer_address);
      done();
    });
  });

});
