'use strict';
let helper = require('./common.js');
helper.setObject('product_image');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images.json')
.reply(200, helper.load('all'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images/count.json')
.reply(200, '{\"count\":2}', { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.get('/admin/products/632910392/images/850703190.json')
.reply(200, helper.load('single'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.post('/admin/products/632910392/images.json', {
  'image': {
    'src': 'http:\/\/example.com\/rails_logo.gif'
  }
})
.reply(201, helper.load('create'), { server: 'nginx', status: '201 OK'});

helper.nock(helper.test_shop)
.put('/admin/products/632910392/images/850703190.json', {
  'image': {
    'id': 850703190,
    'position': 2,
    'metafields': [
      {
        'key': 'alt',
        'value': 'new alt tag content',
        'value_type': 'string',
        'namespace': 'tags'
      }
    ]
  }
})
.reply(201, helper.load('update'), { server: 'nginx', status: '200 OK'});

helper.nock(helper.test_shop)
.delete('/admin/products/632910392/images/850703190.json')
.reply(200, {}, { server: 'nginx', status: '200 OK'});

describe('Product Image', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get a list of product images', done => {
    resource.all('632910392')
    .then(res => {
      res.body.images.should.not.be.empty;
      res.body.images[0].should.have.property('id');
      res.body.images[0].id.should.equal(850703190);
      done();
    });
  });

  it('should get a product image', done => {
    resource.get(632910392, 850703190)
    .then(res => {
      res.body.image.should.be.a.Object();
      res.body.image.id.should.equal(850703190);
      done();
    });
  });

  it('should create a product image', done => {
    let _new = {'src': 'http:\/\/example.com\/rails_logo.gif'};
    resource.create(632910392, _new)
    .then(res => {
      res.body.image.should.have.property('id');
      done();
    });
  });

  it('should update a product image', done => {
    let _mod = {
      'id': 850703190,
      'position': 2,
      'metafields': [
        {
          'key': 'alt',
          'value': 'new alt tag content',
          'value_type': 'string',
          'namespace': 'tags'
        }
      ]
    };
    resource.update(632910392, 850703190, _mod)
    .then(res => {
      res.body.image.should.have.property('id');
      done();
    });
  });

  it('should count product images', done => {
    resource.count(632910392)
    .then(res => {
      res.body.count.should.be.a.Number();
      res.body.count.should.be.equal(2);
      done();
    });
  });

  it('should delete a product image', done => {
    resource.delete(632910392, 850703190)
    .then(res => {
      res.statusCode.should.eql(200);
      done();
    });
  });

});
