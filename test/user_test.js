var helper = require("./common.js");
helper.setObject("user");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/users.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK'
});

describe('User', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all User', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(799407056);
      done();
    });
  });
});
