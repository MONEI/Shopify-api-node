'use strict';
let helper = require('./common.js');
helper.setObject('transaction');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/transactions.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/transactions/count.json')
.reply(200, '{\"count\":3}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/transactions/389404469.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/orders/450789469/transactions.json', {
  'transaction': {
    'kind': 'capture'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

describe('Transaction', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get a representation of all money transfers on a given order', done => {
		resource.all('450789469')
    .then(res => {
      res.body.transactions.should.not.be.empty;
      res.body.transactions[0].should.have.property('id');
      res.body.transactions[0].id.should.equal(179259969);
      done();
    });
	});

	it('should get the representation of a specific transaction', done => {
    resource.get(450789469, 389404469)
    .then(res => {
      res.body.transaction.should.be.a.Object();
      res.body.transaction.id.should.equal(389404469);
      done();
    });
 	});

 	it('should capture a previously authorized order for the full amount', done => {
    let _new = {
      'kind': 'capture'
    };
    resource.create(450789469, _new)
    .then(res => {
      res.body.transaction.should.have.property('id');
      done();
    });
 	});

  it('should count product letiants', done => {
    resource.count(450789469)
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(3);
      done();
    });
  });

});
