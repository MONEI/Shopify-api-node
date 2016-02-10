var common = require('./common.js'),
  scope = common.nock(common.test_shop),
  fixtures = {},
  resource;

common.setObject('article');

[
  'allResponseBody',
  'singleResponseBody',
  'createRequestBody',
  'createResponseBody',
  'updateRequestBody',
  'updateResponseBody'
].forEach(function(fixture) {
  fixtures[fixture] = common.load(fixture);
});

resource = new(common.resource())(common.endpoint);

describe('Article', function() {

  it('should get all articles', function(done) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/blogs/241253187/articles.json')
      .reply(200, resBody);

    resource.all(241253187, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.articles);
      done();
    });
  });


  it('should get an article', function(done) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/blogs/241253187/articles/134645308.json')
      .reply(200, resBody);

    resource.get(241253187, 134645308, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.article);
      done();
    });

  });


  it('should create a new article', function(done) {

    var resBody = fixtures.createResponseBody,
      reqBody = fixtures.createRequestBody;

    scope.post('/admin/blogs/241253187/articles.json', reqBody)
      .reply(201, resBody);

    resource.create(241253187, reqBody.article, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.article);
      done();
    });

  });

  it('should update an article', function(done) {

    var resBody = fixtures.updateResponseBody,
      reqBody = fixtures.updateRequestBody;

    scope.put('/admin/blogs/241253187/articles/134645308.json', reqBody)
      .reply(200, resBody);

    resource.update(241253187, 134645308, reqBody.article, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.article);
      done();
    });
  });

  it('should delete an article', function(done) {
    scope.delete('/admin/blogs/241253187/articles/1037139822.json')
      .reply(200, {});

    resource.delete(241253187, 1037139822, function(err, res) {
      if (err) return done(err);

      res.should.be.exactly(1037139822);
      done();
    });

  });

});
