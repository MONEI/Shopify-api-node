(function() {
  var BaseChild, Metafields, Province,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafields = require('./metafield');

  Province = (function(_super) {

    __extends(Province, _super);

    Province.prototype.parent = "/countries";

    Province.prototype.slug = "province";

    Province.prototype.child = "/provinces";

    function Province(site) {
      Province.__super__.constructor.call(this, site);
    }

    return Province;

  })(BaseChild);

  module.exports = Province;

}).call(this);
