var helper = require("./common.js");
helper.setObject("refund");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/refunds/509562969.json')
  .reply(200, helper.load("refund"), { server: 'nginx',
  status: '200 OK'
});

describe('Refund', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get a refund', function(done) {
    resource.get("450789469", "509562969", function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(509562969);
      res.order_id.should.equal(450789469);
      done();
    });
  });

});
