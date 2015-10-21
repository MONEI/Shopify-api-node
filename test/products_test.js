var assert = require('assert')
  , should = require('chai').should
  , nock   = require('nock')
  , Product = require('../lib/resources/product.js')
  , helper = require('./common');

var all = nock(helper.test_shop)
  .get('/admin/products.json')
  .reply(200, "{\"products\":[{\"body_html\":\"\\u003Cp\\u003E\\u0026nbsp;This is milk\\u003C/p\\u003E\\r\\n\",\"created_at\":\"2012-03-28T19:05:35-04:00\",\"handle\":\"milk\",\"id\":89931019,\"product_type\":\"Beverage\",\"published_at\":\"2012-03-28T19:05:35-04:00\",\"template_suffix\":null,\"title\":\"Milk\",\"updated_at\":\"2012-03-28T19:05:36-04:00\",\"vendor\":\"Serge\",\"tags\":\"\",\"variants\":[{\"compare_at_price\":null,\"created_at\":\"2012-03-28T19:05:35-04:00\",\"fulfillment_service\":\"manual\",\"grams\":10000,\"id\":210515773,\"inventory_management\":\"\",\"inventory_policy\":\"deny\",\"option1\":\"Default Title\",\"option2\":null,\"option3\":null,\"position\":1,\"price\":\"50.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"Default Title\",\"updated_at\":\"2012-03-28T19:05:35-04:00\",\"inventory_quantity\":1}],\"images\":[],\"options\":[{\"name\":\"Title\"}]}]}", { server: 'nginx',
});

var single = nock(helper.test_shop)
  .get('/admin/products/89931019.json')
  .reply(200, "{\"product\":{\"body_html\":\"\\u003Cp\\u003E\\u0026nbsp;This is milk\\u003C/p\\u003E\\r\\n\",\"created_at\":\"2012-03-28T19:05:35-04:00\",\"handle\":\"milk\",\"id\":89931019,\"product_type\":\"Beverage\",\"published_at\":\"2012-03-28T19:05:35-04:00\",\"template_suffix\":null,\"title\":\"Milk\",\"updated_at\":\"2012-03-28T19:05:36-04:00\",\"vendor\":\"Serge\",\"tags\":\"\",\"variants\":[{\"compare_at_price\":null,\"created_at\":\"2012-03-28T19:05:35-04:00\",\"fulfillment_service\":\"manual\",\"grams\":10000,\"id\":210515773,\"inventory_management\":\"\",\"inventory_policy\":\"deny\",\"option1\":\"Default Title\",\"option2\":null,\"option3\":null,\"position\":1,\"price\":\"50.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"Default Title\",\"updated_at\":\"2012-03-28T19:05:35-04:00\",\"inventory_quantity\":1}],\"images\":[],\"options\":[{\"name\":\"Title\"}]}}", { server: 'nginx',
});

var count = nock(helper.test_shop)
  .get('/admin/products/count.json')
  .reply(200, "{\"count\":1}", { server: 'nginx',
    status: '200 OK'
});


var create = nock(helper.test_shop)
  .post('/admin/products.json', "{\"product\":{\"title\":\"Burton Custom Freestlye 151\",\"body_html\":\"<strong>Good snowboard!</strong>\",\"vendor\":\"Burton\",\"product_type\":\"Snowboard\",\"variants\":[{\"option1\":\"First\",\"price\":\"10.00\"},{\"option1\":\"Second\",\"price\":\"20.00\"}]}}")
  .reply(201, "{\"product\":{\"body_html\":\"\\u003Cstrong\\u003EGood snowboard!\\u003C/strong\\u003E\",\"created_at\":\"2012-04-06T00:25:59-04:00\",\"handle\":\"burton-custom-freestlye-151\",\"id\":90291357,\"product_type\":\"Snowboard\",\"published_at\":\"2012-04-06T00:25:59-04:00\",\"template_suffix\":null,\"title\":\"Burton Custom Freestlye 151\",\"updated_at\":\"2012-04-06T00:25:59-04:00\",\"vendor\":\"Burton\",\"tags\":\"\",\"variants\":[{\"compare_at_price\":null,\"created_at\":\"2012-04-06T00:25:59-04:00\",\"fulfillment_service\":\"manual\",\"grams\":0,\"id\":211405369,\"inventory_management\":null,\"inventory_policy\":\"deny\",\"option1\":\"First\",\"option2\":null,\"option3\":null,\"position\":1,\"price\":\"10.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"First\",\"updated_at\":\"2012-04-06T00:25:59-04:00\",\"inventory_quantity\":1},{\"compare_at_price\":null,\"created_at\":\"2012-04-06T00:25:59-04:00\",\"fulfillment_service\":\"manual\",\"grams\":0,\"id\":211405371,\"inventory_management\":null,\"inventory_policy\":\"deny\",\"option1\":\"Second\",\"option2\":null,\"option3\":null,\"position\":2,\"price\":\"20.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"Second\",\"updated_at\":\"2012-04-06T00:25:59-04:00\",\"inventory_quantity\":1}],\"images\":[],\"options\":[{\"name\":\"Title\"}]}}", { server: 'nginx',
});


var update = nock(helper.test_shop)
  .put('/admin/products/90291357.json', "{\"product\":{\"body_html\":\"<strong>Updated</strong>\"}}")
  .reply(200, "{\"product\":{\"body_html\":\"\\u003Cstrong\\u003EUpdated\\u003C/strong\\u003E\",\"created_at\":\"2012-04-06T00:25:59-04:00\",\"handle\":\"burton-custom-freestlye-151\",\"id\":90291357,\"product_type\":\"Snowboard\",\"published_at\":\"2012-04-06T00:25:59-04:00\",\"template_suffix\":null,\"title\":\"Burton Custom Freestlye 151\",\"updated_at\":\"2012-04-06T01:16:33-04:00\",\"vendor\":\"Burton\",\"tags\":\"\",\"variants\":[{\"compare_at_price\":null,\"created_at\":\"2012-04-06T00:25:59-04:00\",\"fulfillment_service\":\"manual\",\"grams\":0,\"id\":211405369,\"inventory_management\":null,\"inventory_policy\":\"deny\",\"option1\":\"First\",\"option2\":null,\"option3\":null,\"position\":1,\"price\":\"10.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"First\",\"updated_at\":\"2012-04-06T00:25:59-04:00\",\"inventory_quantity\":1},{\"compare_at_price\":null,\"created_at\":\"2012-04-06T00:25:59-04:00\",\"fulfillment_service\":\"manual\",\"grams\":0,\"id\":211405371,\"inventory_management\":null,\"inventory_policy\":\"deny\",\"option1\":\"Second\",\"option2\":null,\"option3\":null,\"position\":2,\"price\":\"20.00\",\"requires_shipping\":true,\"sku\":\"\",\"taxable\":true,\"title\":\"Second\",\"updated_at\":\"2012-04-06T00:25:59-04:00\",\"inventory_quantity\":1}],\"images\":[],\"options\":[{\"name\":\"Title\"}]}}", { server: 'nginx',
});

var del = nock(helper.test_shop)
  .delete('/admin/products/90291357.json')
  .reply(200, "{}", { server: 'nginx',
});

describe('Product', function() {
  var site = helper.endpoint;
  var product = new Product(site);

  it('should get all products', function(done) {

    product.all(function(err, products){
      products.should.not.be.empty;
      products[0].should.have.property('id');
      done();
    });

  });


  it('should get a product', function(done) {
    product.get("89931019", function(err, single_product){
      single_product.should.be.a.Object();
      done();
    });

  });


  it('should count a product', function(done) {
    product.count(function(err, count){
      count.should.be.a.Number();
      done();
    });

  });


  it('should create a new product', function(done) {
    var new_product = {
      "title": "Burton Custom Freestlye 151",
      "body_html": "<strong>Good snowboard!</strong>",
      "vendor": "Burton",
      "product_type": "Snowboard",
      "variants": [
        {
          "option1": "First",
          "price": "10.00"
        },
        {
          "option1": "Second",
          "price": "20.00"
        }
      ]
    };

    product.create(new_product , function(err, _product){
      _product.should.have.property('id');
      done();
    });

  });


  it('should update a product', function(done) {
    var modified_product = {
      "body_html": "<strong>Updated</strong>"
    };

    product.update("90291357", modified_product, function(err, _product){
      _product.should.have.property('body_html');
      _product.body_html.should.equal("<strong>Updated</strong>");
      done();
    });

  });


  it('should delete a product', function(done) {
    product.delete("90291357", function(err, _product){
      _product.should.equal('90291357');
      done();
    });

  });


});
