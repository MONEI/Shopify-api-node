var helper = require("./common.js");
helper.setObject("policy");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/policies.json')
.reply(200, helper.load("all"), {
  server: 'nginx',
  status: '200 OK'
});

describe('Policy', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all policies', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res.should.be.an.Array();
      res[0].should.have.property('title');
      res[0].title.should.equal('Refund Policy');
      done();
    });
  });
});
