var helper = require("./common.js");
helper.setObject("order_risk");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/risks.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK'
});


helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/risks/284138680.json')
  .reply(200, helper.load("risk"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/orders/450789469/risks.json',{
      "risk": {
        "message": "This order came from an anonymous proxy",
        "recommendation": "cancel",
        "score": 1.0,
        "source": "External",
        "cause_cancel": true,
        "display": true
      }

  }).reply(201, helper.load("create"), { server: 'nginx',
  	 status: '200 OK'
});

helper.nock(helper.test_shop)
  .put('/admin/orders/450789469/risks/284138680.json', {
      "risk": {
        "id": 284138680,
        "message": "After further review, this is a legitimate order",
        "recommendation": "accept",
        "source": "External",
        "cause_cancel": false,
        "score": 0.0
      }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/orders/450789469/risks/284138680.json')
  .reply(201, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Order Risk', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get all order risks', function(done) {
		resource.all("450789469", function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  res[0].should.have.property('order_id');
      res[0].id.should.equal(284138680);
		  res[0].order_id.should.equal(450789469);
		  done();
		});

	});


	it('should get an order risk', function(done) {
	    resource.get("450789469", "284138680", function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(284138680);
	      res.order_id.should.equal(450789469);
	      done();
	    });
 	});


 	it('should create a new order risk', function(done) {
	    var _new = {
          "message": "This order came from an anonymous proxy",
          "recommendation": "cancel",
          "score": 1.0,
          "source": "External",
          "cause_cancel": true,
          "display": true
      };

	    resource.create("450789469", _new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });

 	 });


 	it('should update an order risk', function(done) {
	    var _mod = {
              "id": 284138680,
              "message": "After further review, this is a legitimate order",
              "recommendation": "accept",
              "source": "External",
              "cause_cancel": false,
              "score": 0.0
            };

	    resource.update("450789469","284138680" , _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
    });

	it('should delete an order risk', function(done) {

	    resource.delete("450789469","284138680" , function(err, _resource){
	      _resource.should.be.equal("284138680");
	      done();
	    });

	});

});
