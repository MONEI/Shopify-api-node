var helper = require("./common.js");
helper.setObject("product_variant");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/products/632910392/variants.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/products/632910392/variants/count.json')
.reply(200, "{\"count\":4}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/variants/808950810.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/products/632910392/variants.json', {
    "variant": {
        "option1": "Default Title",
        "price": "1.00"
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/variants/808950810.json', {
    "variant": {
      "id": 808950810,
      "inventory_quantity": 100,
      "old_inventory_quantity": 10
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/products/632910392/variants/808950810.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Product Variant', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of product variants', function(done) {
		resource.all('632910392', function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(808950810);
		  done();
		});
	});

	it('should get a product variant', function(done) {
	    resource.get(808950810, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(808950810);
	      done();
	    });
 	});

 	it('should create a product variant', function(done) {
	    var _new = {
        "option1": "Default Title",
        "price": "1.00"
      };
	    resource.create(632910392, _new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });


 	it('should update a product variant', function(done) {
	    var _mod = {
        "id": 808950810,
        "inventory_quantity": 100,
        "old_inventory_quantity": 10
      };
	    resource.update(808950810, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count product variants', function(done) {
     resource.count(632910392, function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(4);
       done();
     });
   });

 	it('should delete a product variant', function(done) {
	    resource.delete(632910392, 808950810, function(err, _resource){
	      _resource.should.be.equal(808950810);
	      done();
	    });
 	 });

});
