'use strict';
let helper = require('./common.js');
helper.setObject('comment');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/comments.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/comments.json?article_id=134645308&blog_id=241253187')
.reply(200, helper.load('allForIDs'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/comments/118373535.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/comments.json',{
  'comment': {
    'body': 'I like comments\nAnd I like posting them *RESTfully*.',
    'author': 'Your name',
    'email': 'your@email.com',
    'ip': '107.20.160.121',
    'blog_id': 241253187,
    'article_id': 134645308
  }
})
.reply(200, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/comments/118373535.json', {
  'comment': {
    'id': 118373535,
    'body': 'You can even update through a web service.',
    'author': 'Your new name',
    'email': 'your@updated-email.com',
    'published_at': '2015-09-02T18:54:05.693Z'
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/comments/count.json')
.reply(200, '{\"count\":2}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/spam.json')
.reply(200, helper.load('spam'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/not_spam.json')
.reply(200, helper.load('not_spam'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/approve.json')
.reply(200, helper.load('approve'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/comments/653537639/remove.json')
.reply(200, helper.load('remove'), { server: 'nginx', status: '200 OK'});

describe('Comment', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all comments', done => {
    resource.all()
    .then(res => {
      res.body.comments.should.not.be.empty;
      res.body.comments[0].should.have.property('id');
      res.body.comments[0].id.should.equal(653537639);
      done();
    });
  });

  it('should get all the comments for a certain article of a blog', done => {
    resource.all({article_id:134645308, blog_id:241253187})
    .then(res => {
      res.body.comments.should.not.be.empty;
      res.body.comments[0].should.have.property('id');
      res.body.comments[0].id.should.equal(653537639);
      done();
    });
  });

  it('should get a comment by its ID', done => {
    resource.get('118373535')
    .then(res => {
      res.body.comment.should.be.a.Object();
      res.body.comment.id.should.equal(118373535);
      done();
    });
  });

  it('should create a new comment with basic textile markup for a certain article of a blog', done => {
    let _new = {
      'body': 'I like comments\nAnd I like posting them *RESTfully*.',
      'author': 'Your name',
      'email': 'your@email.com',
      'ip': '107.20.160.121',
      'blog_id': 241253187,
      'article_id': 134645308
    };
    resource.create(_new)
    .then(res => {
      res.body.comment.should.have.property('id');
      done();
    });
  });

  it('should update a comment of an article within a blog', done => {
	    let _mod = {
        'id': 118373535,
        'body': 'You can even update through a web service.',
        'author': 'Your new name',
        'email': 'your@updated-email.com',
        'published_at': '2015-09-02T18:54:05.693Z'
      };
	    resource.update('118373535' , _mod)
      .then(res => {
        res.body.comment.should.have.property('id');
        done();
      });
 	 });

  it('should count comments for the shop', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(2);
      done();
    });
  });

  it('should mark a comment as spam', done => {
    resource.spam(653537639)
    .then(res => {
      res.body.should.have.property('id');
      res.body.id.should.equal(653537639);
      done();
    });
  });

  it('should mark a comment as not spam, restoring a comment marked as spam back to published', done => {
    resource.notSpam(653537639)
    .then(res => {
      res.body.should.have.property('id');
      res.body.id.should.equal(653537639);
      done();
    });
  });

  it('should approve a comment that is currently pending unapproved so that it will be published on the site', done => {
    resource.approve(653537639)
    .then(res => {
      res.body.should.have.property('id');
      res.body.id.should.equal(653537639);
      done();
    });
  });

  it('should remove a comment', done => {
    resource.remove(653537639)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
