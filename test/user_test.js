var helper = require("./common.js");
helper.setObject("user");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/users.json')
.reply(200, helper.load("all"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/users/799407056.json')
.reply(200, helper.load("single"), {
  server: 'nginx',
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

  it('able to get user by id', function(done) {
    resource.get('799407056', function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(799407056);
      done();
    });
  });
});
