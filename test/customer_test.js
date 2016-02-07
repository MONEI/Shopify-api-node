'use strict';
let common = require('./common.js')
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('customer');

[
  'allResponseBody',
  'searchResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Customer', () => {
  it('should get a list of all customers', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/customers.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.customers.should.be.eql(resBody.customers);
      done();
    });
  });

  it('should search customers', done => {
    let resBody = fixtures.searchResponseBody;
    scope.get('/admin/customers/search.json?query=Bob%20country%3AUnited%20States')
    .reply(200, resBody);
    resource.search({
      query: 'Bob country:United States'
    })
    .then(res => {
      res.body.customers.should.be.eql(resBody.customers);
      done();
    });
  });

  it('should get a single customer by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/customers/207119551.json').reply(200, resBody);
    resource.get(207119551)
    .then(res => {
      res.body.customer.should.be.eql(resBody.customer);
      done();
    });
  });

  it('should create a customer', done => {
    let resBody = fixtures.createResponseBody
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/customers.json', reqBody).reply(201, resBody);
    resource.create(reqBody.customer)
    .then(res => {
      res.body.customer.should.be.eql(resBody.customer);
      done();
    });
  });

  it('should update a customer', done => {
    let resBody = fixtures.updateResponseBody
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/customers/207119551.json', reqBody).reply(200, resBody);
    resource.update(207119551, reqBody.customer)
    .then(res => {
      res.body.customer.should.be.eql(resBody.customer);
      done();
    });
  });

  it('should create an account activation URL', done => {
    let url = 'http://apple.myshopify.com/account/activate/207119551/' +
      '2b2856679c9b5dd03984eb4db626929a-1448568012';
    scope.post('/admin/customers/207119551/account_activation_url.json', {
      customer: { id: 207119551 }
    }).reply(201, { account_activation_url: url });
    resource.createActivationUrl(207119551)
    .then(res => {
      res.body.account_activation_url.should.be.exactly(url);
      done();
    });
  });

  it('should remove a customer', done => {
    scope.delete('/admin/customers/207119551.json').reply(200, {});
    resource.delete(207119551)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

  it('should get a count of all customers', done => {
    scope.get('/admin/customers/count.json').reply(200, { count: 1 });
    resource.count()
    .then(res => {
      res.body.count.should.be.exactly(1);
      done();
    });
  });

});
