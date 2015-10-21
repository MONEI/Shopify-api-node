var helper = require("./common.js");
helper.setObject("transaction");

var Resource = helper.resource();

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/transactions.json')
  .reply(200, helper.load("all"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/transactions/count.json')
.reply(200, "{\"count\":3}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
  .get('/admin/orders/450789469/transactions/389404469.json')
  .reply(200, helper.load("single"), { server: 'nginx',
  	 status: '200 OK',
});

helper.nock(helper.test_shop)
  .post('/admin/orders/450789469/transactions.json', {
    "transaction": {
      "kind": "capture"
    }
})
  .reply(201, helper.load("create"), { server: 'nginx',
  	 status: '201 OK',
});

describe('Transaction', function() {
	var site = helper.endpoint;
	var resource = new Resource(site);

	it('should get a representation of all money transfers on a given order', function(done) {
		resource.all('450789469', function(err, res){
		  res.should.not.be.empty;
		  res[0].should.have.property('id');
      res[0].id.should.equal(179259969);
		  done();
		});
	});

	it('should get the representation of a specific transaction', function(done) {
	    resource.get(450789469, 389404469, function(err, res){
	      res.should.be.a.Object();
        res.id.should.equal(389404469);
	      done();
	    });
 	});

 	it('should capture a previously authorized order for the full amount', function(done) {
	    var _new = {
        "kind": "capture"
      };
	    resource.create(450789469, _new, function(err, _resource){
	      _resource.should.have.property('id');
	      done();
	    });
 	 });

   it('should count product variants', function(done) {
     resource.count(450789469, function(err, count){
       count.should.be.a.Number();
       count.should.be.equal(3);
       done();
     });
   });

});
