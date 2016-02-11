'use strict';
let helper = require('./common.js');
helper.setObject('province');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/countries/879921427/provinces.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/countries/879921427/provinces/count.json')
.reply(200, '{\"count\":13}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/countries/879921427/provinces/224293623.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.put('/admin/countries/879921427/provinces/224293623.json', {
  'province': {
    'id': 224293623,
    'tax': 0.15
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

describe('Province', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get all provinces', done => {
		resource.all('879921427')
    .then(res => {
      res.body.provinces.should.not.be.empty;
      res.body.provinces[0].should.have.property('id');
      res.body.provinces[0].id.should.equal(205434194);
      done();
    });
	});

	it('should get a single province for a country', done => {
    resource.get(879921427, 224293623)
    .then(res => {
      res.body.province.should.be.a.Object();
      res.body.province.id.should.equal(224293623);
      done();
    });
 	});

 	it('should update a province\s tax rate', done => {
	    let _mod = {
        'id': 224293623,
        'tax': 0.15
      };
    resource.update(879921427, 224293623, _mod)
    .then(res => {
      res.body.province.should.have.property('id');
      done();
    });
 	});

   it('should count of all provinces', done => {
    resource.count(879921427)
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(13);
      done();
    });
  });

});
