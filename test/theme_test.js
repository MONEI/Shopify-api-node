'use strict';
let helper = require('./common.js');
helper.setObject('theme');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/themes.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/themes/828155753.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/themes.json', {
  'theme': {
    'name': 'Lemongrass',
    'src': 'http:\/\/themes.shopify.com\/theme.zip',
    'role': 'main'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/themes/752253240.json', {
  'theme': {
    'id': 752253240,
    'body_html': '<p>Okay, maybe we will give you a warranty.<\/p>',
    'author': 'Your name',
    'title': 'My new Title',
    'handle': 'new-title'
   }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/themes/752253240.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Theme', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get a list of a shop\'s themes', done => {
		resource.all()
    .then(res => {
      res.body.themes.should.not.be.empty;
      res.body.themes[0].should.have.property('id');
      res.body.themes[0].id.should.equal(828155753);
      done();
    });
	});

	it('should get a single theme', done => {
    resource.get(828155753)
    .then(res => {
      res.body.theme.should.be.a.Object();
      res.body.theme.id.should.equal(828155753);
      done();
    });
 	});

 	it('should create a theme', done => {
    let _new = {
      'name': 'Lemongrass',
      'src': 'http:\/\/themes.shopify.com\/theme.zip',
      'role': 'main'
    };
    resource.create(_new)
    .then(res => {
      res.body.theme.should.have.property('id');
      done();
    });
 	});

 	it('should update a theme', done => {
    let _mod = {
      'id': 752253240,
      'body_html': '<p>Okay, maybe we will give you a warranty.<\/p>',
      'author': 'Your name',
      'title': 'My new Title',
      'handle': 'new-title'
    };
    resource.update(752253240, _mod)
    .then(res => {
      res.body.theme.should.have.property('id');
      done();
    });
 	});

 	it('should delete a page', done => {
    resource.delete(752253240)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
 	});

});
