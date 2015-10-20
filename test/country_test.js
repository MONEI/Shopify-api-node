var helper = require("./common.js");
helper.setObject("country");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/countries.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/countries.json?since_id=359115488')
.reply(200, helper.load("allSinceID"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/countries/879921427.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/countries.json',{
  "country": {
    "code": "FR"
  }
})
.reply(201, helper.load("create"), { server: 'nginx',
status: '201 OK'
});

helper.nock(helper.test_shop)
.put('/admin/countries/879921427.json', {
  "country": {
    "id": 879921427,
    "tax": 0.1
  }
})
.reply(201, helper.load("update"), { server: 'nginx',
status: '201 OK',
});

helper.nock(helper.test_shop)
.get('/admin/countries/count.json')
.reply(200, "{\"count\":3}", { server: 'nginx',
});

helper.nock(helper.test_shop)
.delete('/admin/countries/879921427.json')
.reply(201, {}, { server: 'nginx',
status: '200 OK',
});




describe('Country', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all countries', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(879921427);
      done();
    });
  });

  it('should get all countries after specified ID', function(done) {
    resource.all({since_id: 359115488}, function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(817138619);
      done();
    });
  });

  it('should get a country', function(done) {
    resource.get("879921427", function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(879921427);
      done();
    });
  });

  it('should create a country', function(done) {
    var _new = {
      "code": "FR"
    };
    resource.create(_new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should update a country', function(done) {
    var _mod = {
      "id": 879921427,
      "tax": 0.1
    };
    resource.update(879921427 , _mod, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should delete a country', function(done) {
    resource.delete("879921427" , function(err, _resource){
      _resource.should.be.equal("879921427");
      done();
    });
  });

  it('should count countries', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(3);
      done();
    });
  });

});
