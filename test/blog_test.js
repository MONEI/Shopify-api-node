var common = require('./common.js'),
  scope = common.nock(common.test_shop),
  fixtures = {},
  resource;

common.setObject('blog');

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

describe('blog', function() {

  it('should get all blogs', function(done) {
    var resBody = fixtures.allResponseBody;

    scope.get('/admin/blogs.json')
      .reply(200, resBody);

    resource.all(function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.blogs);
      done();
    });
  });


  it('should get a blog', function(done) {
    var resBody = fixtures.singleResponseBody;

    scope.get('/admin/blogs/450789469.json')
      .reply(200, resBody);

    resource.get(450789469, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.blog);
      done();
    });

  });


  it('should create a new blog', function(done) {

    var resBody = fixtures.createResponseBody,
      reqBody = fixtures.createRequestBody;

    scope.post('/admin/blogs.json', reqBody)
      .reply(201, resBody);

    resource.create(reqBody.blog, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.blog);
      done();
    });

  });

  it('should update a blog', function(done) {

    var resBody = fixtures.updateResponseBody,
      reqBody = fixtures.updateRequestBody;

    scope.put('/admin/blogs/450789469.json', reqBody)
      .reply(200, resBody);

    resource.update(450789469, reqBody.blog, function(err, res) {
      if (err) return done(err);

      res.should.be.eql(resBody.blog);
      done();
    });
  });

  it('should delete a blog', function(done) {
    scope.delete('/admin/blogs/450789469.json')
      .reply(200, {});

    resource.delete(450789469, function(err, res) {
      if (err) return done(err);

      res.should.be.exactly(450789469);
      done();
    });

  });

});
