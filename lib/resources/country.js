(function() {
  var Base, Country,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Country = (function(_super) {

    __extends(Country, _super);

    Country.prototype.slug = "collect";

    Country.prototype.prefix = "/collects";

    function Country(site) {
      Country.__super__.constructor.call(this, site);
    }

    return Country;

  })(Base);

  module.exports = Country;

}).call(this);
