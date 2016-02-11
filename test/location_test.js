'use strict';
let helper = require('./common.js');
helper.setObject('location');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/locations.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/locations/487838322.json')
.reply(200, helper.load('location'), { server: 'nginx', status: '200 OK'});

describe('Location', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get all locations', done => {
		resource.all()
    .then(res => {
      res.body.locations.should.not.be.empty;
      res.body.locations[0].should.have.property('id');
      done();
    });
	});

  it('should get a location', done => {
    resource.get('487838322')
    .then(res => {
      res.body.location.should.be.a.Object();
      res.body.location.id.should.equal(487838322);
      done();
    });
  });

});
