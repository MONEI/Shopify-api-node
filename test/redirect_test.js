var helper = require("./common.js");
helper.setObject("redirect");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/redirects.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/redirects/count.json')
.reply(200, "{\"count\":3}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/redirects/668809255.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/redirects.json', {
    "redirect": {
      "path": "\/ipod",
      "target": "\/pages\/itunes"
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/redirects/668809255.json', {
    "redirect": {
      "id": 668809255,
      "path": "\/tiger"
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/redirects/668809255.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Redirect', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all redirects', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(304339089);
		  done();
		});
	});

	it('should get a single redirect', function(done) {
	    resource.get(668809255, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(668809255);
	      done();
	    });
 	});

 	it('should create a redirect', function(done) {
	    var _new = {
        "path": "\/ipod",
        "target": "\/pages\/itunes"
      };
	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });


 	it('should update a redirect', function(done) {
	    var _mod = {
        "id": 668809255,
        "path": "\/tiger"
      };
	    resource.update(668809255, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count redirects', function(done) {
     resource.count(function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(3);
       done();
     });
   });

 	it('should delete a redirect', function(done) {
	    resource.delete(668809255, function(err, _resource){
	      _resource.should.be.equal(668809255);
	      done();
	    });
 	 });

});
