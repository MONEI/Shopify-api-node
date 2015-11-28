var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

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

describe('Gift card', function () {
  it('should list all enabled gift cards', function (next) {
    var resBody = fixtures.allEnabledResponseBody;

    scope.get('/admin/gift_cards.json?status=enabled')
      .reply(200, resBody);

    resource.all({ status: 'enabled' }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_cards);
      next();
    });
  });

  it('should list all gift cards', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/gift_cards.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_cards);
      next();
    });
  });

  it('should get a single gift card by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/gift_cards/48394658.json')
      .reply(200, resBody);

    resource.get(48394658, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_card);
      next();
    });
  });

  it('should count all enabled gift cards', function (next) {
    scope.get('/admin/gift_cards/count.json?status=enabled')
      .reply(200, { count: 3 });

    resource.count({ status: 'enabled' }, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(3);
      next();
    });
  });

  it('should count all gift cards', function (next) {
    scope.get('/admin/gift_cards/count.json')
      .reply(200, { count: 3 });

    resource.count(function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(3);
      next();
    });
  });

  it('should create a gift card', function (next) {
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/gift_cards.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.gift_card, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_card);
      next();
    });
  });

  it('should update a gift card', function (next) {
    var resBody = fixtures.updateResponseBody
      , reqBody = fixtures.updateRequestBody;

    scope.put('/admin/gift_cards/48394658.json', reqBody)
      .reply(200, resBody);

    resource.update(48394658, reqBody.gift_card, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_card);
      next();
    });
  });

  it('should disable a gift card', function (next) {
    var resBody = fixtures.disableResponseBody;

    scope.post('/admin/gift_cards/48394658/disable.json', {
      gift_card: { id: 48394658 }
    }).reply(201, resBody);

    resource.disable(48394658, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_card);
      next();
    });
  });

  it('should search gift cards', function (next) {
    var resBody = fixtures.searchResponseBody;

    scope.get('/admin/gift_cards/search.json?query=Bob')
      .reply(200, resBody);

    resource.search({ query: 'Bob' }, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.gift_cards);
      next();
    });
  });
});
