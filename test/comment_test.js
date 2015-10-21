var helper = require("./common.js");
helper.setObject("comment");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/comments.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/comments.json?article_id=134645308&blog_id=241253187')
.reply(200, helper.load("allForIDs"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/comments/118373535.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/comments.json',{
  "comment": {
    "body": "I like comments\nAnd I like posting them *RESTfully*.",
    "author": "Your name",
    "email": "your@email.com",
    "ip": "107.20.160.121",
    "blog_id": 241253187,
    "article_id": 134645308
  }
})
.reply(200, helper.load("create"), { server: 'nginx',
status: '201 OK'
});

helper.nock(helper.test_shop)
  .put('/admin/comments/118373535.json', {
    "comment": {
      "id": 118373535,
      "body": "You can even update through a web service.",
      "author": "Your new name",
      "email": "your@updated-email.com",
      "published_at": "2015-09-02T18:54:05.693Z"
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/comments/count.json')
.reply(200, "{\"count\":2}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/spam.json')
.reply(200, helper.load("spam"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/not_spam.json')
.reply(200, helper.load("not_spam"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/approve.json')
.reply(200, helper.load("approve"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/remove.json')
.reply(200, helper.load("remove"), { server: 'nginx',
status: '200 OK'
});


describe('Comment', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all comments', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(653537639);
      done();
    });
  });

  it('should get all the comments for a certain article of a blog', function(done) {
    resource.all({article_id:134645308, blog_id:241253187}, function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(653537639);
      done();
    });
  });

  it('should get a comment by its ID', function(done) {
    resource.get("118373535", function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(118373535);
      done();
    });
  });

  it('should create a new comment with basic textile markup for a certain article of a blog', function(done) {
    var _new = {
      "body": "I like comments\nAnd I like posting them *RESTfully*.",
      "author": "Your name",
      "email": "your@email.com",
      "ip": "107.20.160.121",
      "blog_id": 241253187,
      "article_id": 134645308
    }
    resource.create(_new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should update a comment of an article within a blog', function(done) {
	    var _mod = {
        "id": 118373535,
        "body": "You can even update through a web service.",
        "author": "Your new name",
        "email": "your@updated-email.com",
        "published_at": "2015-09-02T18:54:05.693Z"
      };
	    resource.update("118373535" , _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

  it('should count comments for the shop', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(2);
      done();
    });
  });

  it('should mark a comment as spam', function(done) {
    resource.spam(653537639, function(err, _resource){
      _resource.should.have.property('id');
      _resource.id.should.equal(653537639);
      done();
    });
  });

  it('should mark a comment as not spam, restoring a comment marked as spam back to published', function(done) {
    resource.notSpam(653537639, function(err, _resource){
      _resource.should.have.property('id');
      _resource.id.should.equal(653537639);
      done();
    });
  });

  it('should approve a comment that is currently pending unapproved so that it will be published on the site', function(done) {
    resource.approve(653537639, function(err, _resource){
      _resource.should.have.property('id');
      _resource.id.should.equal(653537639);
      done();
    });
  });

  it('should remove a comment', function(done) {
    resource.remove(653537639, function(err, _resource){
      _resource.should.have.property('id');
      _resource.id.should.equal(653537639);
      done();
    });
  });

});
