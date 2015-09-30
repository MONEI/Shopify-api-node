var helper = require("./common.js");
helper.setObject("article");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/blogs/241253187/articles.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .get('/admin/blogs/241253187/articles/134645308.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/blogs/241253187/articles.json', {"article":{"title":"My new Article title"}})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/blogs/241253187/articles/1037139822.json', {"article":{"title":"New Article Modded"}})
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/blogs/241253187/articles/1037139822.json')
  .reply(201, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Article', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get all articles', function(done) {
		resource.all("241253187", function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  res[0].should.have.property('blog_id');
		  res[0].blog_id.should.equal(241253187);
		  done();
		});

	});


	it('should get an article', function(done) {
	    resource.get("241253187", "134645308", function(err, res){
	      res.should.be.a.Object();
	      res.blog_id.should.equal(241253187);
	      done();
	    });
 	});


 	it('should create a new article', function(done) {
	    var _new = {
	      "title": "My new Article title"
	  	};

	    resource.create("241253187", _new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });

 	 });


 	it('should update an article', function(done) {
	    var _mod = {
	      "title": "New Article Modded"
	  	};

	    resource.update("241253187","1037139822" , _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
    });

	it('should delete an article', function(done) {

	    resource.delete("241253187","1037139822" , function(err, _resource){
	      _resource.should.be.equal("1037139822");
	      done();
	    });

	});

});
