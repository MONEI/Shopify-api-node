(function() {
  var Base, Cart,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Cart = (function(_super) {

    __extends(Cart, _super);

    Cart.prototype.slug = "cart";

    Cart.prototype.prefix = "/carts";

    function Cart(site) {
      Cart.__super__.constructor.call(this, site);
    }

    return Cart;

  })(Base);

  module.exports = Cart;

}).call(this);
