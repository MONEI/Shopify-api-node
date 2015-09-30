var helper = require("./common.js");
helper.setObject("location");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/locations.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  status: '200 OK',
});

helper.nock(helper.test_shop)
  .get('/admin/locations/487838322.json')
  .reply(200, helper.load("location"), { server: 'nginx',
  status: '200 OK',
});

describe('Location', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all locations', function(done) {
		resource.all(function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
		  done();
		});

	});

  it('should get a location', function(done) {
    resource.get("487838322", function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(487838322);
      done();
    });
  });

});
