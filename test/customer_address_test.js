var helper = require("./common.js");
helper.setObject("customer_address");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/customers/207119551/addresses.json')
  .reply(200, helper.load("customer_address"), { server: 'nginx',
  status: '200 OK',
});

describe('CustomerAddress', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all addresses', function(done) {
    resource.all("207119551", function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      done();
    });
  });

});
