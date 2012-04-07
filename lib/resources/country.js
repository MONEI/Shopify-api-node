(function() {
  var Base, Country,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Country = (function(_super) {

    __extends(Country, _super);

    Country.prototype.slug = "country";

    Country.prototype.prefix = "/countries";

    function Country(site) {
      Country.__super__.constructor.call(this, site);
    }

    Country.prototype.all = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString(this.prefix, params);
      return this.resource.get(url, "countries", callback);
    };

    return Country;

  })(Base);

  module.exports = Country;

}).call(this);
