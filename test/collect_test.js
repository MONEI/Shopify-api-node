var helper = require("./common.js");
helper.setObject("collect");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/collects.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/collects.json?product_id=632910392')
.reply(200, helper.load("allForID"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/collects/841564295.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/collects.json',{
  "collect": {
    "product_id": 921728736,
    "collection_id": 841564295
  }
})
.reply(200, helper.load("create"), { server: 'nginx',
status: '201 OK'
});

helper.nock(helper.test_shop)
.get('/admin/collects/count.json')
.reply(200, "{\"count\":2}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/collects/count.json?product_id=632910392')
.reply(200, "{\"count\":2}", { server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.delete('/admin/collects/841564295.json')
.reply(201, {}, { server: 'nginx',
status: '200 OK',
});




describe('Collect', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all collects', function(done) {
    resource.all(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(395646240);
      done();
    });
  });

  it('should get all collects for product ID', function(done) {
    resource.all({product_id:632910392}, function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(395646240);
      done();
    });
  });

  it('should get a product or collection collect', function(done) {
    resource.get("841564295", function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(841564295);
      done();
    });
  });

  it('should create a collect', function(done) {
    var _new = {
      "product_id": 921728736,
      "collection_id": 841564295
    }
    resource.create(_new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });


  it('should delete a collect', function(done) {
    resource.delete("841564295" , function(err, _resource){
      _resource.should.be.equal("841564295");
      done();
    });
  });

  it('should count a collect', function(done) {
    resource.count(function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(2);
      done();
    });
  });

  it('should count a collect with params', function(done) {
    resource.count({product_id:632910392}, function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(2);
      done();
    });
  });

});
