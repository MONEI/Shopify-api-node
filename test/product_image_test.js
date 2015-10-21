var helper = require("./common.js");
helper.setObject("product_image");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images.json')
.reply(200, helper.load("all"), { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images/count.json')
.reply(200, "{\"count\":2}", { server: 'nginx',
status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images/850703190.json')
.reply(200, helper.load("single"), { server: 'nginx',
status: '200 OK',
});

helper.nock(helper.test_shop)
.post('/admin/products/632910392/images.json', {
  "image": {
    "src": "http:\/\/example.com\/rails_logo.gif"
  }
})
.reply(201, helper.load("create"), { server: 'nginx',
status: '201 OK',
});

helper.nock(helper.test_shop)
.put('/admin/products/632910392/images/850703190.json', {
  "image": {
    "id": 850703190,
    "position": 2,
    "metafields": [
      {
        "key": "alt",
        "value": "new alt tag content",
        "value_type": "string",
        "namespace": "tags"
      }
    ]
  }
})
.reply(201, helper.load("update"), { server: 'nginx',
status: '200 OK',
});


helper.nock(helper.test_shop)
.delete('/admin/products/632910392/images/850703190.json')
.reply(200, {}, { server: 'nginx',
status: '200 OK',
});

describe('Product Image', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get a list of product images', function(done) {
    resource.all('632910392', function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(850703190);
      done();
    });
  });

  it('should get a product image', function(done) {
    resource.get(632910392, 850703190, function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(850703190);
      done();
    });
  });

  it('should create a product image', function(done) {
    var _new = {
      "src": "http:\/\/example.com\/rails_logo.gif"
    };
    resource.create(632910392, _new, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });


  it('should update a product image', function(done) {
    var _mod = {
      "id": 850703190,
      "position": 2,
      "metafields": [
        {
          "key": "alt",
          "value": "new alt tag content",
          "value_type": "string",
          "namespace": "tags"
        }
      ]
    };
    resource.update(632910392, 850703190, _mod, function(err, _resource){
      _resource.should.have.property('id');
      done();
    });
  });

  it('should count product images', function(done) {
    resource.count(632910392, function(err, count){
      count.should.be.a.Number();
      count.should.be.equal(2);
      done();
    });
  });

  it('should delete a product image', function(done) {
    resource.delete(632910392, 850703190, function(err, _resource){
      _resource.should.be.equal(850703190);
      done();
    });
  });

});
