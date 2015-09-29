var helper = require("./common.js");
helper.setObject("checkout");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/checkouts/count.json')
  .reply(200, "{\"count\":5}", { server: 'nginx',
    status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/checkouts.json')
  .reply(200, helper.load("checkouts"), { server: 'nginx',
  	 status: '200 OK'
});


describe('Checkout', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

  it('should count all checkouts', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.equal(5);
      done();
    });

  });

  it('should get all checkouts', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      done();
    });

  });


});
