(function() {
  var Base, Theme,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Theme = (function(_super) {

    __extends(Theme, _super);

    Theme.prototype.slug = "theme";

    Theme.prototype.prefix = "/themes";

    function Theme(site) {
      Theme.__super__.constructor.call(this, site);
    }

    return Theme;

  })(Base);

  module.exports = Theme;

}).call(this);
