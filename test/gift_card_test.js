var helper = require("./common.js");
helper.setObject("gift_card");

var Resource = helper.resource();

helper.nock(helper.test_shop)
.get('/admin/gift_cards.json')
.reply(200, helper.load("all"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/gift_cards.json?status=enabled')
.reply(200, helper.load("all"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/gift_cards/48394658.json')
.reply(200, helper.load("single"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/gift_cards/count.json?status=enabled')
.reply(200, helper.load("countAll"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/gift_cards/count.json')
.reply(200, helper.load("countAll"), {
  server: 'nginx',
  status: '200 OK'
});

describe('Gift card', function() {
  var site = helper.endpoint;
  var resource = new Resource(site);

  it('should get all gift cards', function(done) {
    resource.getAll(function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(48394658);
      done();
    });
  });

  it('should get all gift cards with status enabled', function(done) {
    resource.getByStatus('enabled', function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(48394658);
      done();
    });
  });

  it('should throw error with invalid status', function(done) {
    resource.getByStatus('invalid-status', function(err, res){
      err.should.not.be.empty;
      done();
    });
  });

  it('able to get gift card by id', function(done) {
    resource.get('48394658', function(err, res){
      res.should.be.a.Object();
      res.id.should.equal(48394658);
      done();
    });
  });

  it('get count all of gift cards', function(done) {
    resource.getCount(function(err, res){
      console.log(res);
      res.should.equal(3);
      done();
    });
  });

  it('get count of gift cards by status', function(done) {
    resource.getCountByStatus('enabled', function(err, res){
      console.log(err, res);
      res.should.equal(3);
      done();
    });
  });

});
