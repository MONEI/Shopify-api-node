var helper = require("./common.js");
helper.setObject("blog");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/blogs.json')
  .reply(200, helper.load("blogs"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .get('/admin/blogs/450789469.json')
  .reply(200, helper.load("blog"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/blogs.json', {"blog":{"title":"New Blog"}})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/blogs/450789469.json', {"blog":{"title":"New Blog Modded"}})
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/blogs/450789469.json')
  .reply(201, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Blog', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get all blogs', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  done();
		});

	});


	it('should get blog', function(done) {
	    resource.get("450789469", function(err, res){
	      res.should.be.a.Object();
	      done();
	    });
 	});


 	it('should create a new blog', function(done) {
	    var _new = {
	      "title": "New Blog"
	  	};

	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });

 	 });


 	it('should update a blog', function(done) {
	    var _mod = {
	      "title": "New Blog Modded"
	  	};

	    resource.update("450789469" , _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });

 	 });

 	it('should delete a blog', function(done) {

	    resource.delete("450789469" , function(err, _resource){
	      _resource.should.be.equal("450789469");
	      done();
	    });

 	 });

});
