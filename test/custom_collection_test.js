'use strict';
let helper = require('./common.js');
helper.setObject('custom_collection');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/custom_collections.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/custom_collections.json?product_id=632910392')
.reply(200, helper.load('allWithID'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/custom_collections/count.json')
.reply(200, '{\"count\":3}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/custom_collections/841564295.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
  .post('/admin/custom_collections.json', {
    'custom_collection': {
    'title': 'IPods',
    'collects': [
      {
        'product_id': 921728736
      }
    ]
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
  .put('/admin/custom_collections/841564295.json', {
    'custom_collection': {
      'id': 841564295,
      'published': true
    }
  })
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/custom_collections/841564295.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Custom Collection', () => {
	let site = helper.endpoint;
	let resource = new Resource(site);

	it('should get a list of all custom collections', done => {
		resource.all()
    .then(res => {
      res.body.custom_collections.should.not.be.empty;
      res.body.custom_collections[0].should.have.property('id');
      res.body.custom_collections[0].id.should.equal(841564295);
      done();
    });
	});

  it('should get a list of all custom collections for a certain product_id', done => {
    resource.all({product_id: 632910392})
    .then(res => {
      res.body.custom_collections.should.not.be.empty;
      res.body.custom_collections[0].should.have.property('id');
      res.body.custom_collections[0].id.should.equal(841564295);
      done();
    });
  });

	it('should get a sinle custom collection', done => {
    resource.get(841564295)
    .then(res => {
      res.body.custom_collection.should.be.a.Object();
      res.body.custom_collection.id.should.equal(841564295);
      done();
    });
 	});

 	it('should create collection with a collect', done => {
    let _new = {
      'title': 'IPods',
      'collects': [
        {
          'product_id': 921728736
        }
      ]
    };
    resource.create(_new)
    .then(res => {
      res.body.custom_collection.should.have.property('id');
      done();
    });
 	});

 	it('should update a custom collection', done => {
    let _mod = {
      'id': 841564295,
      'published': true
    };
    resource.update(841564295, _mod)
    .then(res => {
      res.body.custom_collection.should.have.property('id');
      done();
    });
 	});

  it('should count custom collections', done => {
    resource.count()
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(3);
      done();
    });
  });

 	it('should delete a custom collection', done => {
    resource.delete(841564295)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
 	});

});
