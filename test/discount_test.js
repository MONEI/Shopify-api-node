var common = require('./common.js')
  , scope = common.nock(common.test_shop)
  , fixtures = {}
  , resource;

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
    var resBody = fixtures.createResponseBody
      , reqBody = fixtures.createRequestBody;

    scope.post('/admin/discounts.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.discount, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should list all discounts', function (next) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/discounts.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.discounts);
      next();
    });
  });

  it('should disable a discount', function (next) {
    var resBody = fixtures.disableResponseBody;

    resource.disable('', function (err) {
      err.should.be.an.Error();
      err.message.should.be.exactly('invalid or missing id');

      scope.post('/admin/discounts/680866/disable.json')
        .reply(201, resBody);

      resource.disable(680866, function (err, res) {
        if (err) return next(err);

        res.should.be.eql(resBody.discount);
        next();
      });
    });
  });

  it('should enable a discount', function (next) {
    var resBody = fixtures.enableResponseBody;

    resource.enable(null, function (err) {
      err.should.be.an.Error();
      err.message.should.be.exactly('invalid or missing id');

      scope.post('/admin/discounts/949676421/enable.json')
        .reply(201, resBody);

      resource.enable(949676421, function (err, res) {
        if (err) return next(err);

        res.should.be.eql(resBody.discount);
        next();
      });
    });
  });

  it('should get a single discount by its ID', function (next) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/discounts/680866.json')
      .reply(200, resBody);

    resource.get(680866, function (err, res) {
      if (err) return next(err);

      res.should.be.eql(resBody.discount);
      next();
    });
  });

  it('should destroy a discount', function (next) {
    scope.delete('/admin/discounts/680866.json')
      .reply(200, {});

    resource.delete(680866, function (err, res) {
      if (err) return next(err);

      res.should.be.exactly(680866);
      next();
    });
  });
});
