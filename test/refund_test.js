'use strict';
let helper = require('./common.js');
helper.setObject('refund');
let Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/orders/450789469/refunds/509562969.json')
.reply(200, helper.load('refund'), { server: 'nginx', status: '200 OK'});

describe('Refund', () => {
  let site = helper.endpoint;
  let resource = new Resource(site);

  it('should get a refund', done => {
    resource.get('450789469', '509562969')
    .then(res => {
      res.body.refund.should.be.a.Object();
      res.body.refund.id.should.equal(509562969);
      res.body.refund.order_id.should.equal(450789469);
      done();
    });
  });

});
