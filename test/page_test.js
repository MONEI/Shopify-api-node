'use strict';
let helper = require('./common.js');
helper.setObject('page');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/pages.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/pages/count.json')
.reply(200, '{\"count\":4}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/pages/131092082.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/pages.json', {
  'page': {
    'title': 'Warranty information',
    'body_html': '<h1>Warranty<\/h1>\n<p><strong>Forget it<\/strong>, we aint giving you nothing<\/p>',
    'published': false
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/pages/131092082.json', {
  'page': {
      'id': 131092082,
      'body_html': '<p>Okay, maybe we will give you a warranty.<\/p>',
      'author': 'Your name',
      'title': 'My new Title',
      'handle': 'new-title'
    }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/pages/131092082.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Page', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get a list of all pages', done => {
		resource.all()
    .then(res => {
      res.body.pages.should.not.be.empty;
      res.body.pages[0].should.have.property('id');
      res.body.pages[0].id.should.equal(322471);
      done();
    });
	});

	it('should get a single page', done => {
    resource.get(131092082)
    .then(res => {
      res.body.page.should.be.a.Object();
      res.body.page.id.should.equal(131092082);
      done();
    });
 	});

 	it('should create a page', done => {
    let _new = {
      'title': 'Warranty information',
      'body_html': '<h1>Warranty<\/h1>\n<p><strong>Forget it<\/strong>, we aint giving you nothing<\/p>',
      'published': false
    };
    resource.create(_new)
    .then(res => {
      res.body.page.should.have.property('id');
      done();
    });
 	});


 	it('should update a page', done => {
    let _mod = {
      'id': 131092082,
      'body_html': '<p>Okay, maybe we will give you a warranty.<\/p>',
      'author': 'Your name',
      'title': 'My new Title',
      'handle': 'new-title'
    };
    resource.update(131092082, _mod)
    .then(res => {
      res.body.page.should.have.property('id');
      done();
    });
 	});

  it('should count pages', done => {
     resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(4);
      done();
    });
  });

 	it('should delete a page', done => {
    resource.delete(131092082)
    .then(res => {
      res.statusCode.should.be.equal(200);
      done();
    });
 	});

});
