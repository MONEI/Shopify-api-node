'use strict';
let helper = require('./common.js');
helper.setObject('country');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/countries.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/countries.json?since_id=359115488')
.reply(200, helper.load('allSinceID'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/countries/879921427.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/countries.json',{
  'country': {
    'code': 'FR'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/countries/879921427.json', {
  'country': {
    'id': 879921427,
    'tax': 0.1
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.get('/admin/countries/count.json')
.reply(200, '{\"count\":3}', { server: 'nginx'});

helper.nock(helper.test_shop)
.delete('/admin/countries/879921427.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Country', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all countries', done => {
    resource.all()
    .then(res => {
      res.body.countries.should.not.be.empty;
      res.body.countries[0].should.have.property('id');
      res.body.countries[0].id.should.equal(879921427);
      done();
    });
  });

  it('should get all countries after specified ID', done => {
    resource.all({since_id: 359115488})
    .then(res => {
      res.body.countries.should.not.be.empty;
      res.body.countries[0].should.have.property('id');
      res.body.countries[0].id.should.equal(817138619);
      done();
    });
  });

  it('should get a country', done => {
    resource.get('879921427')
    .then(res => {
      res.body.country.should.not.be.empty;
      res.body.country.should.have.property('id');
      res.body.country.id.should.equal(879921427);
      done();
    });
  });

  it('should create a country', done => {
    let _new = {'code': 'FR'};
    resource.create(_new)
    .then(res => {
      res.body.country.should.have.property('id');
      done();
    });
  });

  it('should update a country', done => {
    let _mod = {
      'id': 879921427,
      'tax': 0.1
    };
    resource.update(879921427 , _mod)
    .then(res => {
      res.body.country.should.have.property('id');
      done();
    });
  });

  it('should delete a country', done => {
    resource.delete('879921427')
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

  it('should count countries', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(3);
      done();
    });
  });

});
