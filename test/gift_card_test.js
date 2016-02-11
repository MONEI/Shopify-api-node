'use strict';
let common = require('./common.js');
let scope = common.nock(common.test_shop);
let fixtures = {};
let resource;

common.setObject('gift_card');

[
  'allEnabledResponseBody',
  'allResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody',
  'disableResponseBody',
  'searchResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new (common.resource())(common.endpoint);

describe('Gift card', () => {
  it('should list all enabled gift cards', done => {
    let resBody = fixtures.allEnabledResponseBody;
    scope.get('/admin/gift_cards.json?status=enabled').reply(200, resBody);
    resource.all({ status: 'enabled' })
    .then(res => {
      res.body.gift_cards.should.be.eql(resBody.gift_cards);
      done();
    });
  });

  it('should list all gift cards', done => {
    let resBody = fixtures.allResponseBody;
    scope.get('/admin/gift_cards.json').reply(200, resBody);
    resource.all()
    .then(res => {
      res.body.gift_cards.should.be.eql(resBody.gift_cards);
      done();
    });
  });

  it('should get a single gift card by its ID', done => {
    let resBody = fixtures.singleResponseBody;
    scope.get('/admin/gift_cards/48394658.json').reply(200, resBody);
    resource.get(48394658)
    .then(res => {
      res.body.gift_card.should.be.eql(resBody.gift_card);
      done();
    });
  });

  it('should count all enabled gift cards', done => {
    scope.get('/admin/gift_cards/count.json?status=enabled')
    .reply(200, { count: 3 });
    resource.count({ status: 'enabled' })
    .then(res => {
      res.body.count.should.be.exactly(3);
      done();
    });
  });

  it('should count all gift cards', done => {
    scope.get('/admin/gift_cards/count.json').reply(200, { count: 3 });
    resource.count()
    .then(res => {
      res.body.count.should.be.exactly(3);
      done();
    });
  });

  it('should create a gift card', done => {
    let resBody = fixtures.createResponseBody;
    let reqBody = fixtures.createRequestBody;
    scope.post('/admin/gift_cards.json', reqBody).reply(201, resBody);
    resource.create(reqBody.gift_card)
    .then(res => {
      res.body.gift_card.should.be.eql(resBody.gift_card);
      done();
    });
  });

  it('should update a gift card', done => {
    let resBody = fixtures.updateResponseBody;
    let reqBody = fixtures.updateRequestBody;
    scope.put('/admin/gift_cards/48394658.json', reqBody).reply(200, resBody);
    resource.update(48394658, reqBody.gift_card)
    .then(res => {
      res.body.gift_card.should.be.eql(resBody.gift_card);
      done();
    });
  });

  it('should disable a gift card', done => {
    let resBody = fixtures.disableResponseBody;
    scope.post('/admin/gift_cards/48394658/disable.json', {
      gift_card: { id: 48394658 }
    })
    .reply(201, resBody);
    resource.disable(48394658)
    .then(res => {
      res.body.gift_card.should.be.eql(resBody.gift_card);
      done();
    });
  });

  it('should search gift cards', done => {
    let resBody = fixtures.searchResponseBody;
    scope.get('/admin/gift_cards/search.json?query=Bob').reply(200, resBody);
    resource.search({ query: 'Bob' })
    .then(res => {
      res.body.gift_cards.should.be.eql(resBody.gift_cards);
      done();
    });
  });

});
