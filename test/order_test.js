var helper = require("./common.js");
helper.setObject("order");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/orders.json')
  .reply(200, helper.load("orders"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .get('/admin/orders/450789469.json')
  .reply(200, helper.load("order"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/close.json')
  .reply(200, helper.load("order"), { server: 'nginx',
  	 status: '200 OK',
});


describe('Order', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get all orders', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  done();
		});

	});


	it('should get an order', function(done) {
	    resource.get("450789469", function(err, res){
	      res.should.be.a.Object();
	      done();
	    });
 	});


 	it('should get close an order', function(done) {
	    resource.close("450789469", function(err, res){
	      res.should.be.a.Object();
	      res.should.have.property('id');
	      done();
	    });
 	});




});
