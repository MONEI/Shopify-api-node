'use strict';
let Product = require('../lib/resources/product.js')
let helper = require('./common')
let nock = require('nock');

nock(helper.test_shop)
  // all
.get('/admin/products.json')
.reply(200, '{"products":[{"body_html":"\\u003Cp\\u003E\\u0026nbsp;This is milk\\u003C/p\\u003E\\r\\n","created_at":"2012-03-28T19:05:35-04:00","handle":"milk","id":89931019,"product_type":"Beverage","published_at":"2012-03-28T19:05:35-04:00","template_suffix":null,"title":"Milk","updated_at":"2012-03-28T19:05:36-04:00","vendor":"Serge","tags":"","variants":[{"compare_at_price":null,"created_at":"2012-03-28T19:05:35-04:00","fulfillment_service":"manual","grams":10000,"id":210515773,"inventory_management":"","inventory_policy":"deny","option1":"Default Title","option2":null,"option3":null,"position":1,"price":"50.00","requires_shipping":true,"sku":"","taxable":true,"title":"Default Title","updated_at":"2012-03-28T19:05:35-04:00","inventory_quantity":1}],"images":[],"options":[{"name":"Title"}]}]}', { server: 'nginx' })
// single
.get('/admin/products/89931019.json')
.reply(200, '{"product":{"body_html":"\\u003Cp\\u003E\\u0026nbsp;This is milk\\u003C/p\\u003E\\r\\n","created_at":"2012-03-28T19:05:35-04:00","handle":"milk","id":89931019,"product_type":"Beverage","published_at":"2012-03-28T19:05:35-04:00","template_suffix":null,"title":"Milk","updated_at":"2012-03-28T19:05:36-04:00","vendor":"Serge","tags":"","variants":[{"compare_at_price":null,"created_at":"2012-03-28T19:05:35-04:00","fulfillment_service":"manual","grams":10000,"id":210515773,"inventory_management":"","inventory_policy":"deny","option1":"Default Title","option2":null,"option3":null,"position":1,"price":"50.00","requires_shipping":true,"sku":"","taxable":true,"title":"Default Title","updated_at":"2012-03-28T19:05:35-04:00","inventory_quantity":1}],"images":[],"options":[{"name":"Title"}]}}', { server: 'nginx' })
// count
.get('/admin/products/count.json')
.reply(200, '{"count":1}', { server: 'nginx', status: '200 OK' })
// create
.post('/admin/products.json', '{"product":{"title":"Burton Custom Freestlye 151","body_html":"<strong>Good snowboard!</strong>","vendor":"Burton","product_type":"Snowboard","variants":[{"option1":"First","price":"10.00"},{"option1":"Second","price":"20.00"}]}}')
.reply(201, '{"product":{"body_html":"\\u003Cstrong\\u003EGood snowboard!\\u003C/strong\\u003E","created_at":"2012-04-06T00:25:59-04:00","handle":"burton-custom-freestlye-151","id":90291357,"product_type":"Snowboard","published_at":"2012-04-06T00:25:59-04:00","template_suffix":null,"title":"Burton Custom Freestlye 151","updated_at":"2012-04-06T00:25:59-04:00","vendor":"Burton","tags":"","variants":[{"compare_at_price":null,"created_at":"2012-04-06T00:25:59-04:00","fulfillment_service":"manual","grams":0,"id":211405369,"inventory_management":null,"inventory_policy":"deny","option1":"First","option2":null,"option3":null,"position":1,"price":"10.00","requires_shipping":true,"sku":"","taxable":true,"title":"First","updated_at":"2012-04-06T00:25:59-04:00","inventory_quantity":1},{"compare_at_price":null,"created_at":"2012-04-06T00:25:59-04:00","fulfillment_service":"manual","grams":0,"id":211405371,"inventory_management":null,"inventory_policy":"deny","option1":"Second","option2":null,"option3":null,"position":2,"price":"20.00","requires_shipping":true,"sku":"","taxable":true,"title":"Second","updated_at":"2012-04-06T00:25:59-04:00","inventory_quantity":1}],"images":[],"options":[{"name":"Title"}]}}', { server: 'nginx' })
// update
.put('/admin/products/90291357.json', '{"product":{"body_html":"<strong>Updated</strong>"}}')
.reply(200, '{"product":{"body_html":"\\u003Cstrong\\u003EUpdated\\u003C/strong\\u003E","created_at":"2012-04-06T00:25:59-04:00","handle":"burton-custom-freestlye-151","id":90291357,"product_type":"Snowboard","published_at":"2012-04-06T00:25:59-04:00","template_suffix":null,"title":"Burton Custom Freestlye 151","updated_at":"2012-04-06T01:16:33-04:00","vendor":"Burton","tags":"","variants":[{"compare_at_price":null,"created_at":"2012-04-06T00:25:59-04:00","fulfillment_service":"manual","grams":0,"id":211405369,"inventory_management":null,"inventory_policy":"deny","option1":"First","option2":null,"option3":null,"position":1,"price":"10.00","requires_shipping":true,"sku":"","taxable":true,"title":"First","updated_at":"2012-04-06T00:25:59-04:00","inventory_quantity":1},{"compare_at_price":null,"created_at":"2012-04-06T00:25:59-04:00","fulfillment_service":"manual","grams":0,"id":211405371,"inventory_management":null,"inventory_policy":"deny","option1":"Second","option2":null,"option3":null,"position":2,"price":"20.00","requires_shipping":true,"sku":"","taxable":true,"title":"Second","updated_at":"2012-04-06T00:25:59-04:00","inventory_quantity":1}],"images":[],"options":[{"name":"Title"}]}}', { server: 'nginx' })
// delete
.delete('/admin/products/90291357.json')
.reply(200, '{}', { server: 'nginx' });

describe('Product', () => {
  let site = helper.endpoint;
  let product = new Product(site);

  it('should get all products', done => {
    product.all()
    .then(res => {
      res.body.products.should.not.be.empty;
      res.body.products[0].should.have.property('id');
      done();
    });
  });

  it('should get a product', done => {
    product.get('89931019')
    .then(res => {
      res.body.product.should.be.a.Object();
      done();
    });
  });

  it('should count a product', done => {
    product.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      done();
    });
  });

  it('should create a new product', done => {
    product.create({
      title: 'Burton Custom Freestlye 151',
      body_html: '<strong>Good snowboard!</strong>',
      vendor: 'Burton',
      product_type: 'Snowboard',
      variants: [
        {
          'option1': 'First',
          'price': '10.00'
        },
        {
          'option1': 'Second',
          'price': '20.00'
        }
      ]
    })
    .then(res => {
      res.body.product.should.have.property('id');
      done();
    });
  });

  it('should update a product', done => {
    product.update('90291357', {
      body_html: '<strong>Updated</strong>'
    })
    .then(res => {
      res.body.product.should.have.property('body_html');
      res.body.product.body_html.should.equal('<strong>Updated</strong>');
      done();
    });
  });

  it('should delete a product', done => {
    product.delete('90291357')
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
