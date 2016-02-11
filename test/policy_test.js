'use strict';
let helper = require('./common.js');
helper.setObject('policy');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/policies.json')
.reply(200, helper.load('all'), {server: 'nginx', status: '200 OK'});

describe('Policy', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all policies', done => {
    resource.all()
    .then(res => {
      res.body.policies.should.not.be.empty;
      res.body.policies.should.be.an.Array();
      res.body.policies[0].should.have.property('title');
      res.body.policies[0].title.should.equal('Refund Policy');
      done();
    });
  });

});
