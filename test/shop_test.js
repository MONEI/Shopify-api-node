'use strict';
let helper = require('./common.js');
helper.setObject('shop');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/shop.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

describe('Shop', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get the configuration of the shop account', done => {
    resource.get()
    .then(res => {
      res.body.shop.should.be.a.Object();
      res.body.shop.id.should.equal(690933842);
      done();
    });
 	});

});
