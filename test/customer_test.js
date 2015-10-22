var helper = require("./common.js");
helper.setObject("customer");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/customers.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/customers/count.json')
.reply(200, "{\"count\":1}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/customers/207119551.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK',
});

helper.nock(helper.test_shop)
.post('/admin/customers.json', {
  "customer": {
    "first_name": "Steve",
    "last_name": "Lastnameson",
    "email": "steve.lastnameson@example.com",
    "verified_email": true,
    "addresses": [
      {
        "address1": "123 Oak St",
        "city": "Ottawa",
        "province": "ON",
        "phone": "555-1212",
        "zip": "123 ABC",
        "last_name": "Lastnameson",
        "first_name": "Mother",
        "country": "CA"
      }
    ]
  }
})
.reply(201, helper.load("create"), { server: 'nginx',
status: '201 OK',
});

helper.nock(helper.test_shop)
.put('/admin/customers/207119551.json', {
  "customer": {
    "id": 207119551,
    "metafields": [
      {
        "key": "new",
        "value": "newvalue",
        "value_type": "string",
        "namespace": "global"
      }
    ]
  }
})
.reply(201, helper.load("update"), { server: 'nginx',
status: '200 OK',
});


helper.nock(helper.test_shop)
.delete('/admin/customers/207119551.json')
.reply(200, {}, { server: 'nginx',
status: '200 OK',
});

describe('Customer', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all customers of a shop', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(207119551);
      done();
    });
  });

  it('should get a single customer', function(done) {
    resource.get(207119551, function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(207119551);
      done();
    });
  });

  it('should create a customer', function(done) {
    var _new = {
      "first_name": "Steve",
      "last_name": "Lastnameson",
      "email": "steve.lastnameson@example.com",
      "verified_email": true,
      "addresses": [
        {
          "address1": "123 Oak St",
          "city": "Ottawa",
          "province": "ON",
          "phone": "555-1212",
          "zip": "123 ABC",
          "last_name": "Lastnameson",
          "first_name": "Mother",
          "country": "CA"
        }
      ]
    };
    resource.create(_new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });


  it('should update a customer', function(done) {
    var _mod = {
      "id": 207119551,
      "metafields": [
        {
          "key": "new",
          "value": "newvalue",
          "value_type": "string",
          "namespace": "global"
        }
      ]
    };
    resource.update(207119551, _mod, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should count customers', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(1);
      done();
    });
  });

  it('should delete a customer', function(done) {
    resource.delete(207119551, function(err, _resource){
      _resource.should.be.equal(207119551);
      done();
    });
  });

});
