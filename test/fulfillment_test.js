var helper = require("./common.js");
helper.setObject("fulfillment");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/fulfillments.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/fulfillments/count.json')
.reply(200, "{\"count\":1}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/fulfillments/255858046.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK'
});


helper.nock(helper.test_shop)
  .post('/admin/orders/450789469/fulfillments.json', {
    "fulfillment": {
      "tracking_number": null,
      "line_items": [
        {
          "id": 466157049
        }
      ]
    }
  })
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK'
});


helper.nock(helper.test_shop)
  .put('/admin/orders/450789469/fulfillments/255858046.json', {
    "fulfillment": {
      "tracking_number": "987654321",
      "id": 255858046
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '201 OK'
});

helper.nock(helper.test_shop)
  .post('/admin/orders/450789469/fulfillments/255858046/cancel.json')
  .reply(201, helper.load("cancel"), { server: 'nginx',
  	 status: '201 OK'
});

helper.nock(helper.test_shop)
  .post('/admin/orders/450789469/fulfillments/255858046/complete.json')
  .reply(201, helper.load("complete"), { server: 'nginx',
  	 status: '201 OK'
});

describe('Fulfillment', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all fulfillments for an order', function(done) {
		resource.all(450789469, function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(255858046);
		  done();
		});
	});

	it('should get a representation of a specific fulfillment', function(done) {
	    resource.get(450789469, 255858046, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(255858046);
	      done();
	    });
 	});

  it('should create a single line item by explicitly specifying the line items to be fulfilled', function(done) {
    var _new = {
      "tracking_number": null,
      "line_items": [
        {
          "id": 466157049
        }
      ]
    };
    resource.create(450789469, _new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });


 	it('should update tracking number for a fulfillment', function(done) {
	    var _mod = {
        "tracking_number": "987654321",
         "id": 255858046
      };
	    resource.update(450789469, 255858046, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count all the total number of fulfillments for an order', function(done) {
     resource.count(450789469, function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(1);
       done();
     });
   });

   it('should cancel a pending fulfillment', function(done) {
 	    resource.cancel(450789469, 255858046, function(err, _resource){
 	      _resource.should.have.property('id');
        _resource.id.should.equal(255858046);
 	      done();
 	    });
  });

  it('should complete a pending fulfillment', function(done) {
     resource.complete(450789469, 255858046, function(err, _resource){
       _resource.should.have.property('id');
       _resource.id.should.equal(255858046);
       done();
     });
  });

});
