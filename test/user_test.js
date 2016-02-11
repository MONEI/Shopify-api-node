'use strict';
let helper = require('./common.js');
helper.setObject('user');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/users.json')
.reply(200, helper.load('all'), {server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/users/799407056.json')
.reply(200, helper.load('single'), {server: 'nginx', status: '200 OK'});

describe('User', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all User', done => {
    resource.all()
    .then(res => {
      res.body.users.should.not.be.empty;
      res.body.users[0].should.have.property('id');
      res.body.users[0].id.should.equal(799407056);
      done();
    });
  });

  it('able to get user by id', done => {
    resource.get('799407056')
    .then(res => {
      res.body.user.should.be.a.Object();
      res.body.user.id.should.equal(799407056);
      done();
    });
  });

});
