'use strict';
let helper = require('./common.js');
helper.setObject('checkout');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/checkouts/count.json')
.reply(200, '{"count": 5}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/checkouts.json')
.reply(200, helper.load('checkouts'), { server: 'nginx', status: '200 OK'});

describe('Checkout', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

  it('should count all checkouts', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.equal(5);
      done();
    });
  });

  it('should get all checkouts', done => {
    resource.all()
    .then(res => {
      res.body.checkouts[0].should.have.property('id');
      done();
    });
  });

});
