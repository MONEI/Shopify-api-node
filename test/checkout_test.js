var common = require('./common.js'),
  scope = common.nock(common.test_shop),
  fixtures = {},
  resource;

common.setObject('checkout');

[
  'allResponseBody',
  'countResponseBody'
].forEach(function (fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new(common.resource())(common.endpoint);

describe('Checkout', function () {

  it('should count all checkouts', function (done) {
    var resBody = fixtures.countResponseBody;

    scope.get('/admin/checkouts/count.json')
      .reply(200, resBody);

    resource.count(function (err, count) {
      if (err) return done(err);

      count.should.be.a.Number();
      count.should.equal(resBody.count);

      done();
    });

  });

  it('should get all checkouts', function (done) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/checkouts.json')
      .reply(200, resBody);

    resource.all(function (err, res) {
      if (err) return done(err);

      res.should.not.be.empty;
      res[0].should.have.property('id');

      done();
    });
  });


});
