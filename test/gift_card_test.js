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

helper.nock(helper.test_shop)
.post('/admin/gift_cards.json', {
  gift_card: {
    "note": "This is a note",
    "initial_value": 100.0,
    "code": "ABCD EFGH IJKL MNOP",
    "template_suffix": "gift_cards.birthday.liquid"
  }
})
.reply(200, helper.load("createGiftCard"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.put('/admin/gift_cards/1063936316.json', {
  gift_card: {
    "note": "Updating with a new note"
  }
})
.reply(200, helper.load("updateGiftCard"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.post('/admin/gift_cards/1063936316/disable.json', {
  'gift_card': {
    'id': '1063936316'
  }
})
.reply(200, helper.load("disableGiftCard"), {
  server: 'nginx',
  status: '200 OK'
});

helper.nock(helper.test_shop)
.get('/admin/gift_cards/search.json?query=Bob')
.reply(200, helper.load("search"), {
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
      res.should.equal(3);
      done();
    });
  });

  it('get count of gift cards by status', function(done) {
    resource.getCountByStatus('enabled', function(err, res){
      res.should.equal(3);
      done();
    });
  });

  it('should create gift card', function(done) {
    var giftCard = {
      "note": "This is a note",
      "initial_value": 100.0,
      "code": "ABCD EFGH IJKL MNOP",
      "template_suffix": "gift_cards.birthday.liquid"
    }

    resource.create(giftCard, function(err, res){
      res.initial_value.should.equal(giftCard.initial_value.toFixed(2).toString());
      res.note.should.equal(giftCard.note);
      done();
    });
  });

  it('should update gift card', function(done) {
    var giftCard = {
      "note": "Updating with a new note"
    }

    resource.update('1063936316', giftCard, function(err, res){
      res.note.should.equal(giftCard.note);
      done();
    });
  });

  it('should disable gift card', function(done) {
    resource.disable('1063936316', function(err, res){
      res.disabled_at.should.not.be.null();
      done();
    });
  });

  it('should search gift card', function(done) {
    resource.search('Bob', function(err, res){
      res.should.not.be.empty;
      res[0].should.have.property('id');
      res[0].id.should.equal(1063936317);
      done();
    });
  });

});
