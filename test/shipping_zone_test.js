var helper = require('./common.js');
helper.setObject('shipping_zone');

var fixture = {
  all: helper.load('all')
};

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/shipping_zones.json')
  .reply(200, fixture.all);

describe('Shipping zone', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all shipping zones', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res.should.deepEqual(fixture.all.shipping_zones);
      done();
    });
  });
});
