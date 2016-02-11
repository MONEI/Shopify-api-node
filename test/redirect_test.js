'use strict';
let helper = require('./common.js');
helper.setObject('redirect');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/redirects.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/redirects/count.json')
.reply(200, '{\"count\":3}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/redirects/668809255.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/redirects.json', {
  'redirect': {
    'path': '\/ipod',
    'target': '\/pages\/itunes'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/redirects/668809255.json', {
  'redirect': {
    'id': 668809255,
    'path': '\/tiger'
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/redirects/668809255.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Redirect', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get a list of all redirects', done => {
		resource.all()
    .then(res => {
      res.body.redirects.should.not.be.empty;
      res.body.redirects[0].should.have.property('id');
      res.body.redirects[0].id.should.equal(304339089);
      done();
    });
	});

	it('should get a single redirect', done => {
    resource.get(668809255)
    .then(res => {
      res.body.redirect.should.be.a.Object();
      res.body.redirect.id.should.equal(668809255);
      done();
    });
 	});

 	it('should create a redirect', done => {
    let _new = {
      'path': '\/ipod',
      'target': '\/pages\/itunes'
    };
    resource.create(_new)
    .then(res => {
      res.body.redirect.should.have.property('id');
      done();
    });
 	});

 	it('should update a redirect', done => {
    let _mod = {
      'id': 668809255,
      'path': '\/tiger'
    };
    resource.update(668809255, _mod)
    .then(res => {
      res.body.redirect.should.have.property('id');
      done();
    });
 	});

  it('should count redirects', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(3);
      done();
    });
  });

 	it('should delete a redirect', done => {
    resource.delete(668809255)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
 	});

});
