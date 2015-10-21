var helper = require("./common.js");
helper.setObject("shop");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/shop.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK'
});

describe('Shop', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get the configuration of the shop account', function(done) {
	    resource.get(function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(690933842);
	      done();
	    });
 	});

});
