'use strict';
let helper = require('./common.js');
helper.setObject('customer_saved_search');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/customer_saved_searches/count.json')
.reply(200, '{\"count\":3}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/customer_saved_searches.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/customer_saved_searches/789629109.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/customer_saved_searches/789629109/customers.json')
.reply(200, helper.load('customers'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/customer_saved_searches.json', {
  'customer_saved_search': {
    'name': 'Spent more than $50',
    'query': 'total_spent:>50'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.put('/admin/customer_saved_searches/789629109.json', {
  'customer_saved_search': {
    'id': 789629109,
    'name': 'This Name Has Been Changed'
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/customer_saved_searches/789629109.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Customer Saved Search', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should count all customer saved searches', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.equal(3);
      done();
    });
  });

  it('should get customer saved searches', done => {
    resource.all()
    .then(res => {
      res.body.customer_saved_searches.should.not.be.empty;
		  res.body.customer_saved_searches[0].should.have.property('id');
      done();
    });
	});

  it('should get all customers for a customer saved search', done => {
    resource.getCustomersForId('789629109')
    .then(res => {
      res.body.customers.should.not.be.empty;
      res.body.customers[0].should.have.property('id');
      done();
    });
  });

  it('should get a customer saved search', done => {
    resource.get('789629109')
    .then(res => {
      res.body.customer_saved_search.should.be.a.Object();
      res.body.customer_saved_search.id.should.equal(789629109);
      done();
    });
  });

  it('should create a customer saved search', done => {
    let _new = {
        'name': 'Spent more than $50',
        'query': 'total_spent:>50'
    };
    resource.create(_new)
    .then(res => {
      res.body.customer_saved_search.should.have.property('id');
      done();
    });
  });

  it('should update a customer saved search', done => {
    let _mod = {
        'id': 789629109,
        'name': 'This Name Has Been Changed'
    };
    resource.update('789629109', _mod)
    .then(res => {
      res.body.customer_saved_search.should.have.property('id');
      done();
    });
  });

  it('should delete a customer saved search', done => {
    resource.delete('789629109')
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
