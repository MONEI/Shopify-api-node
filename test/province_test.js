var helper = require("./common.js");
helper.setObject("province");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/countries/879921427/provinces.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/countries/879921427/provinces/count.json')
.reply(200, "{\"count\":13}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/countries/879921427/provinces/224293623.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .put('/admin/countries/879921427/provinces/224293623.json', {
    "province": {
      "id": 224293623,
      "tax": 0.15
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


describe('Province', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get all provinces', function(done) {
		resource.all('879921427', function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(205434194);
		  done();
		});
	});

	it('should get a single province for a country', function(done) {
	    resource.get(879921427, 224293623, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(224293623);
	      done();
	    });
 	});

 	it('should update a province\s tax rate', function(done) {
	    var _mod = {
        "id": 224293623,
        "tax": 0.15
      };
	    resource.update(879921427, 224293623, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count of all provinces', function(done) {
     resource.count(879921427, function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(13);
       done();
     });
   });

});
