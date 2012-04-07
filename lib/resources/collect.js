(function() {
  var Base, Collect,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Collect = (function(_super) {

    __extends(Collect, _super);

    Collect.prototype.slug = "collect";

    Collect.prototype.prefix = "/collects";

    function Collect(site) {
      Collect.__super__.constructor.call(this, site);
    }

    return Collect;

  })(Base);

  module.exports = Collect;

}).call(this);
