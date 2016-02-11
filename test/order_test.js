'use strict';
let helper = require('./common.js');
helper.setObject('order');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/orders.json')
.reply(200, helper.load('orders'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469.json')
.reply(200, helper.load('order'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/close.json')
.reply(200, helper.load('order'), { server: 'nginx', status: '200 OK'});

describe('Order', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get all orders', done => {
		resource.all()
    .then(res => {
      res.body.orders.should.not.be.empty;
      res.body.orders[0].should.have.property('id');
      done();
    });
	});

	it('should get an order', done => {
    resource.get('450789469')
    .then(res => {
      res.body.order.should.be.a.Object();
      done();
    });
 	});

 	it('should get close an order', done => {
    resource.close('450789469')
    .then(res => {
      res.body.order.should.be.a.Object();
      res.body.order.should.have.property('id');
      done();
    });
 	});

});
