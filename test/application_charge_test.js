'use strict';
let helper = require('./common.js');
helper.setObject('application_charge');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/application_charges.json')
.reply(200, helper.load('all'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/application_charges.json?since_id=556467234')
.reply(200, helper.load('allForID'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/application_charges/675931192.json')
.reply(200, helper.load('single'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/application_charges.json',{
  'application_charge': {
    'name': 'Super Duper Expensive action',
    'price': 100.0,
    'return_url': 'http:\/\/super-duper.shopifyapps.com'
  }
})
.reply(200, helper.load('create'), {server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.post('/admin/application_charges/675931192/activate.json', {
  'application_charge': {
    'id': 675931192,
    'name': 'iPod Cleaning',
    'api_client_id': 755357713,
    'price': '5.00',
    'status': 'accepted',
    'return_url': 'http:\/\/google.com',
    'created_at': '2015-09-02T14:52:56-04:00',
    'updated_at': '2015-09-02T14:52:56-04:00',
    'test': null,
    'charge_type': null,
    'decorated_return_url': 'http:\/\/google.com?charge_id=675931192'
  }
})
.reply(200, {server: 'nginx', status: '200 OK'});

describe('Application Charge', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all application charges', done => {
    resource.all()
    .then(res => {
      res.body.application_charges.should.not.be.empty;
      res.body.application_charges[0].should.have.property('id');
      res.body.application_charges[0].id.should.equal(556467234);
      done();
    });
  });

  it('should get all one-time charges since a specified ID', done => {
    resource.all({since_id: 556467234})
    .then(res => {
      res.body.application_charges.should.not.be.empty;
      res.body.application_charges[0].should.have.property('id');
      res.body.application_charges[0].id.should.equal(675931192);
      done();
    });
  });

  it('should get a one-time application charge', done => {
    resource.get('675931192')
    .then(res => {
      res.body.application_charge.should.be.a.Object();
      res.body.application_charge.id.should.equal(675931192);
      done();
    });
  });

  it('should create a one-time charge', done => {
    let _new = {
      'name': 'Super Duper Expensive action',
      'price': 100.0,
      'return_url': 'http:\/\/super-duper.shopifyapps.com'
    };
    resource.create(_new)
    .then(res => {
      res.body.application_charge.should.have.property('id');
      done();
    });
  });

  it('should activate a previously accepted one-time application charge.', done => {
    let _new =  {
      'id': 675931192,
      'name': 'iPod Cleaning',
      'api_client_id': 755357713,
      'price': '5.00',
      'status': 'accepted',
      'return_url': 'http:\/\/google.com',
      'created_at': '2015-09-02T14:52:56-04:00',
      'updated_at': '2015-09-02T14:52:56-04:00',
      'test': null,
      'charge_type': null,
      'decorated_return_url': 'http:\/\/google.com?charge_id=675931192'
    };
    resource.activate('675931192', _new)
    .then(res => {
      res.statusCode.should.equal(200);
      done();
    });
  });

});
