var helper = require("./common.js");
helper.setObject("custom_collection");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/custom_collections.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/custom_collections.json?product_id=632910392')
.reply(200, helper.load("allWithID"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/custom_collections/count.json')
.reply(200, "{\"count\":3}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/custom_collections/841564295.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/custom_collections.json', {
    "custom_collection": {
    "title": "IPods",
    "collects": [
      {
        "product_id": 921728736
      }
    ]
  }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/custom_collections/841564295.json', {
    "custom_collection": {
      "id": 841564295,
      "published": true
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/custom_collections/841564295.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Custom Collection', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all custom collections', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(841564295);
		  done();
		});
	});

  it('should get a list of all custom collections for a certain product_id', function(done) {
    resource.all({product_id: 632910392}, function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(841564295);
      done();
    });
  });


	it('should get a sinle custom collection', function(done) {
	    resource.get(841564295, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(841564295);
	      done();
	    });
 	});


 	it('should create collection with a collect', function(done) {
	    var _new = {
        "title": "IPods",
        "collects": [
          {
            "product_id": 921728736
          }
        ]
      };
	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });


 	it('should update a custom collection', function(done) {
	    var _mod = {
        "id": 841564295,
        "published": true
      };
	    resource.update(841564295 , _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count custom collections', function(done) {
     resource.count(function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(3);
       done();
     });
   });

 	it('should delete a custom collection', function(done) {
	    resource.delete(841564295 , function(err, _resource){
	      _resource.should.be.equal(841564295);
	      done();
	    });
 	 });

});
