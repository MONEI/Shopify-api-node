(function() {
  var Checkout, Base,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Checkout = (function(_super) {

    __extends(Checkout, _super);

    Checkout.prototype.slug = "checkout";

    Checkout.prototype.prefix = "/checkouts";

    function Checkout(site) {
      Checkout.__super__.constructor.call(this, site);
    }

    return Checkout;

  })(Base);

  module.exports = Checkout;

}).call(this);
