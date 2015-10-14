var helper = require("./common.js");
helper.setObject("policy");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/policies.json')
  .reply(200, helper.load("policy"), { server: 'nginx',
  status: '200 OK',
});

describe('Policy', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all policies', function(done) {
    resource.get(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('title');
      done();
    });
  });

});
