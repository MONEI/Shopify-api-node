'use strict';
let helper = require('./common.js');
helper.setObject('article');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/blogs/241253187/articles.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/blogs/241253187/articles/134645308.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/blogs/241253187/articles.json', {'article':{'title':'My new Article title'}})
.reply(201, helper.load('create'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.put('/admin/blogs/241253187/articles/1037139822.json', {'article':{'title':'New Article Modded'}})
.reply(200, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/blogs/241253187/articles/1037139822.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Article', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get all articles', done => {
		resource.all('241253187')
    .then(res => {
      res.body.articles.should.not.be.empty;
      res.body.articles[0].should.have.property('id');
      res.body.articles[0].should.have.property('blog_id');
      res.body.articles[0].blog_id.should.equal(241253187);
      done();
    });
	});

	it('should get an article', done => {
    resource.get('241253187', '134645308')
    .then(res => {
      res.body.article.should.be.a.Object();
      res.body.article.blog_id.should.equal(241253187);
      done();
    });
 	});

 	it('should create a new article', done => {
    let _new = {title: 'My new Article title'};
    resource.create('241253187', _new)
    .then(res => {
      res.body.article.should.have.property('id');
      done();
    });
 	 });

 	it('should update an article', done => {
    let _mod = {title: 'New Article Modded'};
    resource.update('241253187','1037139822' , _mod)
    .then(res => {
      res.body.article.should.have.property('id');
      done();
    });
  });

	it('should delete an article', done => {
    resource.delete('241253187','1037139822')
    .then(res => {
      res.statusCode.should.equal(200);
      done();
    });
	});

});
