var helper = require("./common.js");
helper.setObject("recurring_application_charge");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/recurring_application_charges.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .get('/admin/recurring_application_charges/455696195.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK'
});

helper.nock(helper.test_shop)
  .post('/admin/recurring_application_charges.json', {
    "recurring_application_charge": {
      "name": "Super Duper Plan",
      "price": 10.0,
      "return_url": "http:\/\/super-duper.shopifyapps.com",
      "test": true
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/recurring_application_charges/455696195/activate.json', {
    "recurring_application_charge": {
      "id": 455696195,
      "name": "Super Mega Plan",
      "api_client_id": 755357713,
      "price": "15.00",
      "status": "accepted",
      "return_url": "http:\/\/yourapp.com",
      "billing_on": "2015-09-01",
      "created_at": "2015-09-02T14:50:32-04:00",
      "updated_at": "2015-09-02T14:51:23-04:00",
      "test": null,
      "activated_on": null,
      "trial_ends_on": null,
      "cancelled_on": null,
      "trial_days": 0,
      "decorated_return_url": "http:\/\/yourapp.com?charge_id=455696195"
     }
})
  .reply(201, {}, { server: 'nginx',
  	 status: '201 OK',
});



helper.nock(helper.test_shop)
  .delete('/admin/recurring_application_charges/455696195.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Recurring Application Charge', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all past and present recurring charge requests are retrieved by this request.', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(455696195);
		  done();
		});
	});

	it('should get a single charge', function(done) {
	    resource.get(455696195, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(455696195);
	      done();
	    });
 	});

 	it('should create a recurring test charge that will not cause a credit card to be charged', function(done) {
	    var _new = {
        "name": "Super Duper Plan",
        "price": 10.0,
        "return_url": "http:\/\/super-duper.shopifyapps.com",
        "test": true
      };
	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should activate a previously accepted recurring application charge', function(done) {
     var _charge = {
           "id": 455696195,
           "name": "Super Mega Plan",
           "api_client_id": 755357713,
           "price": "15.00",
           "status": "accepted",
           "return_url": "http:\/\/yourapp.com",
           "billing_on": "2015-09-01",
           "created_at": "2015-09-02T14:50:32-04:00",
           "updated_at": "2015-09-02T14:51:23-04:00",
           "test": null,
           "activated_on": null,
           "trial_ends_on": null,
           "cancelled_on": null,
           "trial_days": 0,
           "decorated_return_url": "http:\/\/yourapp.com?charge_id=455696195"
      };
     resource.activate(455696195, _charge, function(err, _resource){
       done();
     });
    });

 	it('should cancel the current recurring charge for a shop', function(done) {
	    resource.delete(455696195, function(err, _resource){
	      _resource.should.be.equal(455696195);
	      done();
	    });
 	 });

});
