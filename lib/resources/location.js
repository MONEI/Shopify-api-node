(function() {
  var Base, Location,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Location = (function(_super) {

    __extends(Location, _super);

    Location.prototype.slug = "location";

    Location.prototype.prefix = "/locations";

    function Location(site) {
      Location.__super__.constructor.call(this, site);
    }

    return Location;

  })(Base);

  module.exports = Location;

}).call(this);
