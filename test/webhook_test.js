var helper = require("./common.js");
helper.setObject("webhook");

var Resource = helper.resource();


helper.nock(helper.test_shop)
  .get('/admin/webhooks.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/webhooks/count.json')
.reply(200, "{\"count\":2}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/webhooks/4759306.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/webhooks.json', {
    "webhook": {
      "topic": "orders\/create",
      "address": "http:\/\/whatever.hostname.com\/",
      "format": "json"
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

helper.nock(helper.test_shop)
  .put('/admin/webhooks/4759306.json', {
    "webhook": {
      "id": 4759306,
      "address": "http:\/\/somewhere-else.com\/"
    }
  })
  .reply(201, helper.load("update"), { server: 'nginx',
  	 status: '200 OK',
});


helper.nock(helper.test_shop)
  .delete('/admin/webhooks/4759306.json')
  .reply(200, {}, { server: 'nginx',
  	 status: '200 OK',
});

describe('Webhook', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all webhooks for your shop', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(4759306);
		  done();
		});
	});

	it('should get a single webhook', function(done) {
	    resource.get(4759306, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(4759306);
	      done();
	    });
 	});

 	it('should create a webhook', function(done) {
	    var _new = {
        "topic": "orders\/create",
        "address": "http:\/\/whatever.hostname.com\/",
        "format": "json"
      };
	    resource.create(_new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });


 	it('should update a webhook', function(done) {
	    var _mod = {
        "id": 4759306,
        "address": "http:\/\/somewhere-else.com\/"
      };
	    resource.update(4759306, _mod, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count webhooks', function(done) {
     resource.count(function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(2);
       done();
     });
   });

 	it('should delete a webhook', function(done) {
	    resource.delete(4759306, function(err, _resource){
	      _resource.should.be.equal(4759306);
	      done();
	    });
 	 });

});
