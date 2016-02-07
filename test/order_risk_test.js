'use strict';
let helper = require('./common.js');
helper.setObject('order_risk');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/risks.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/risks/284138680.json')
.reply(200, helper.load('risk'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/orders/450789469/risks.json',{
  'risk': {
    'message': 'This order came from an anonymous proxy',
    'recommendation': 'cancel',
    'score': 1.0,
    'source': 'External',
    'cause_cancel': true,
    'display': true
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.put('/admin/orders/450789469/risks/284138680.json', {
  'risk': {
    'id': 284138680,
    'message': 'After further review, this is a legitimate order',
    'recommendation': 'accept',
    'source': 'External',
    'cause_cancel': false,
    'score': 0.0
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/orders/450789469/risks/284138680.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Order Risk', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get all order risks', done => {
		resource.all('450789469')
    .then(res => {
      res.body.risks.should.not.be.empty;
      res.body.risks[0].should.have.property('id');
      res.body.risks[0].should.have.property('order_id');
      res.body.risks[0].id.should.equal(284138680);
      res.body.risks[0].order_id.should.equal(450789469);
      done();
    });
	});

	it('should get an order risk', done => {
    resource.get('450789469', '284138680')
    .then(res => {
      res.body.risk.should.be.a.Object();
      res.body.risk.id.should.equal(284138680);
      res.body.risk.order_id.should.equal(450789469);
      done();
    });
 	});

 	it('should create a new order risk', done => {
    let _new = {
      'message': 'This order came from an anonymous proxy',
      'recommendation': 'cancel',
      'score': 1.0,
      'source': 'External',
      'cause_cancel': true,
      'display': true
    };
    resource.create('450789469', _new)
    .then(res => {
      res.body.risk.should.have.property('id');
      done();
    });
 	});

 	it('should update an order risk', done => {
    let _mod = {
      'id': 284138680,
      'message': 'After further review, this is a legitimate order',
      'recommendation': 'accept',
      'source': 'External',
      'cause_cancel': false,
      'score': 0.0
    };
    resource.update('450789469','284138680' , _mod)
    .then(res => {
      res.body.risk.should.have.property('id');
      done();
    });
  });

	it('should delete an order risk', done => {
    resource.delete('450789469','284138680')
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
	});

});
