(function() {
  var BaseChild, Transaction,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Transaction = (function(_super) {

    __extends(Transaction, _super);

    Transaction.prototype.parent = "/orders";

    Transaction.prototype.slug = "transaction";

    Transaction.prototype.child = "/transactions";

    function Transaction(site) {
      Transaction.__super__.constructor.call(this, site);
    }

    return Transaction;

  })(BaseChild);

  module.exports = Transaction;

}).call(this);
