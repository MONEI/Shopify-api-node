(function() {
  var BaseChild, Metafield,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Metafield = (function(_super) {

    __extends(Metafield, _super);

    Metafield.prototype.slug = "metafield";

    Metafield.prototype.child = "/metafields";

    function Metafield(parent, site) {
      this.parent = parent;
      Metafield.__super__.constructor.call(this, site);
    }

    return Metafield;

  })(BaseChild);

  module.exports = Metafield;

}).call(this);
