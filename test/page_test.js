var helper = require("./common.js");
helper.setObject("page");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/pages.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/pages/count.json')
.reply(200, "{\"count\":4}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/pages/131092082.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/pages.json', {
    "page": {
      "title": "Warranty information",
      "body_html": "<h1>Warranty<\/h1>\n<p><strong>Forget it<\/strong>, we aint giving you nothing<\/p>",
      "published": false
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/pages/131092082.json', {
    "page": {
        "id": 131092082,
        "body_html": "<p>Okay, maybe we will give you a warranty.<\/p>",
        "author": "Your name",
        "title": "My new Title",
        "handle": "new-title"
      }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/pages/131092082.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Page', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all pages', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(322471);
		  done();
		});
	});

	it('should get a single page', function(done) {
	    resource.get(131092082, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(131092082);
	      done();
	    });
 	});

 	it('should create a page', function(done) {
	    var _new = {
        "title": "Warranty information",
        "body_html": "<h1>Warranty<\/h1>\n<p><strong>Forget it<\/strong>, we aint giving you nothing<\/p>",
        "published": false
      };
	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });


 	it('should update a page', function(done) {
	    var _mod = {
        "id": 131092082,
        "body_html": "<p>Okay, maybe we will give you a warranty.<\/p>",
        "author": "Your name",
        "title": "My new Title",
        "handle": "new-title"
      };
	    resource.update(131092082, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count pages', function(done) {
     resource.count(function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(4);
       done();
     });
   });

 	it('should delete a page', function(done) {
	    resource.delete(131092082, function(err, _resource){
	      _resource.should.be.equal(131092082);
	      done();
	    });
 	 });

});
