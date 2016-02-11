'use strict';
let helper = require('./common.js');
helper.setObject('blog');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/blogs.json')
.reply(200, helper.load('blogs'), { server: 'nginx', status: '200 OK'});


helper.nock(helper.test_shop)
.get('/admin/blogs/450789469.json')
.reply(200, helper.load('blog'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/blogs.json', {'blog':{'title': 'New Blog'}})
.reply(201, helper.load('create'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.put('/admin/blogs/450789469.json', {'blog': {'title': 'New Blog Modded'}})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});


helper.nock(helper.test_shop)
.delete('/admin/blogs/450789469.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Blog', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get all blogs', done => {
		resource.all()
    .then(res => {
      res.body.blogs.should.not.be.empty;
      res.body.blogs[0].should.have.property('id');
      done();
    });
	});

	it('should get blog', done => {
    resource.get('450789469')
    .then(res => {
      res.body.blog.should.be.a.Object();
      done();
    });
 	});

 	it('should create a new blog', done => {
    let _new = {'title': 'New Blog'};
    resource.create(_new)
    .then(res => {
      res.body.blog.should.have.property('id');
      done();
    });
 	});

 	it('should update a blog', done => {
    let _mod = {'title': 'New Blog Modded'};
    resource.update('450789469', _mod)
    .then(res => {
      res.body.blog.should.have.property('id');
      done();
    });
 	});

 	it('should delete a blog', done => {
    resource.delete('450789469')
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
