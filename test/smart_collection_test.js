var helper = require("./common.js");
helper.setObject("smart_collection");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/smart_collections.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK',
});

helper.nock(helper.test_shop)
.get('/admin/smart_collections/count.json')
.reply(200, "{\"count\":1}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/smart_collections/482865238.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK',
});

helper.nock(helper.test_shop)
.post('/admin/smart_collections.json', {
  "smart_collection": {
    "title": "IPods",
    "rules": [
      {
        "column": "title",
        "relation": "starts_with",
        "condition": "iPod"
      }
    ]
  }
})
.reply(201, helper.load("create"), { server: 'nginx',
status: '201 OK',
});

helper.nock(helper.test_shop)
.put('/admin/smart_collections/482865238.json', {
  "smart_collection": {
    "id": 482865238,
    "published": true
  }
})
.reply(201, helper.load("update"), { server: 'nginx',
status: '200 OK',
});


helper.nock(helper.test_shop)
.delete('/admin/smart_collections/482865238.json')
.reply(200, {}, { server: 'nginx',
status: '200 OK',
});

describe('Smart Collection', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get a list of all collections', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(482865238);
      done();
    });
  });

  it('should get a single smart collection', function(done) {
    resource.get(482865238, function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(482865238);
      done();
    });
  });

  it('should create a smart collection', function(done) {
    var _new = {
      "title": "IPods",
      "rules": [
        {
          "column": "title",
          "relation": "starts_with",
          "condition": "iPod"
        }
      ]
    };
    resource.create(_new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });


  it('should update a smart collection', function(done) {
    var _mod = {
      "id": 482865238,
      "published": true
    };
    resource.update(482865238, _mod, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should count smart collections', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(1);
      done();
    });
  });

  it('should delete a smart collection', function(done) {
    resource.delete(482865238, function(err, _resource){
      _resource.should.be.equal(482865238);
      done();
    });
  });

});
