'use strict';
let helper = require('./common.js');
helper.setObject('collect');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/collects.json')
.reply(200, helper.load('all'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/collects.json?product_id=632910392')
.reply(200, helper.load('allForID'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/collects/841564295.json')
.reply(200, helper.load('single'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/collects.json',{
  'collect': {
    'product_id': 921728736,
    'collection_id': 841564295
  }
})
.reply(200, helper.load('create'), {server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.get('/admin/collects/count.json')
.reply(200, '{\"count\":2}', {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/collects/count.json?product_id=632910392')
.reply(200, '{\"count\":2}', {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/collects/841564295.json')
.reply(200, {}, {server: 'nginx', status: '200 OK'});

describe('Collect', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all collects', done => {
    resource.all()
    .then(res => {
      res.body.collects.should.not.be.empty;
      res.body.collects[0].should.have.property('id');
      res.body.collects[0].id.should.equal(395646240);
      done();
    });
  });

  it('should get all collects for product ID', done => {
    resource.all({product_id:632910392})
    .then(res => {
      res.body.collects.should.not.be.empty;
      res.body.collects[0].should.have.property('id');
      res.body.collects[0].id.should.equal(395646240);
      done();
    });
  });

  it('should get a product or collection collect', done => {
    resource.get('841564295')
    .then(res => {
      res.body.collect.should.be.a.Object();
      res.body.collect.id.should.equal(841564295);
      done();
    });
  });

  it('should create a collect', done => {
    let _new = {
      'product_id': 921728736,
      'collection_id': 841564295
    }
    resource.create(_new)
    .then(res => {
      res.body.collect.should.have.property('id');
      done();
    });
  });

  it('should delete a collect', done => {
    resource.delete('841564295')
    .then(res => {
      res.statusCode.should.equal(200);
      done();
    });
  });

  it('should count a collect', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(2);
      done();
    });
  });

  it('should count a collect with params', done => {
    resource.count({product_id:632910392})
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(2);
      done();
    });
  });

});
