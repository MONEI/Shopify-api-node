'use strict';
let helper = require('./common.js');
helper.setObject('webhook');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/webhooks.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/webhooks/count.json')
.reply(200, '{\"count\":2}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/webhooks/4759306.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/webhooks.json', {
  'webhook': {
    'topic': 'orders\/create',
    'address': 'http:\/\/whatever.hostname.com\/',
    'format': 'json'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/webhooks/4759306.json', {
  'webhook': {
    'id': 4759306,
    'address': 'http:\/\/somewhere-else.com\/'
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/webhooks/4759306.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Webhook', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get a list of all webhooks for your shop', done => {
    resource.all()
    .then(res => {
      res.body.webhooks.should.not.be.empty;
      res.body.webhooks[0].should.have.property('id');
      res.body.webhooks[0].id.should.equal(4759306);
      done();
    });
  });

  it('should get a single webhook', done => {
    resource.get(4759306)
    .then(res => {
      res.body.webhook.should.be.a.Object();
      res.body.webhook.id.should.equal(4759306);
      done();
    });
  });

  it('should create a webhook', done => {
    let _new = {
      'topic': 'orders\/create',
      'address': 'http:\/\/whatever.hostname.com\/',
      'format': 'json'
    };
    resource.create(_new)
    .then(res => {
      res.body.webhook.should.have.property('id');
      done();
    });
  });


  it('should update a webhook', done => {
    let _mod = {
      'id': 4759306,
      'address': 'http:\/\/somewhere-else.com\/'
    };
    resource.update(4759306, _mod)
    .then(res => {
      res.body.webhook.should.have.property('id');
      done();
    });
  });

  it('should count webhooks', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(2);
      done();
    });
  });

  it('should delete a webhook', done => {
    resource.delete(4759306)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
