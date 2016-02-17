var helper = require("./common.js");
helper.setObject("shipping_zone");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/shipping_zones.json')
  .reply(200, helper.load("all"), {
    server: 'nginx',
    status: '200 OK'
  });

describe('Shipping zone', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all shipping zones', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res.should.be.an.Array();
      res[0].should.have.property('name');
      res[0].name.should.equal('Some zone');
      res[0].countries.should.be.an.Array();
      res[0].countries[0].name.should.equal('United States');
      done();
    });
  });
});
