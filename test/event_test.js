var helper = require("./common.js");
helper.setObject("event");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/events.json?filter=Product&verb=create')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/events/count.json')
.reply(200, "{\"count\":3}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/events/677313116.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});


describe('Event', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a list of all events related to Products that were created', function(done) {
		resource.all({filter:"Product", verb:"create"}, function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(677313116);
		  done();
		});
	});

	it('should get a single event', function(done) {
	    resource.get(677313116, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(677313116);
	      done();
	    });
 	});

   it('should count events', function(done) {
     resource.count(function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(3);
       done();
     });
   });

});
