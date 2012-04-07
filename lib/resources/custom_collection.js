(function() {
  var Base, CustomCollection,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  CustomCollection = (function(_super) {

    __extends(CustomCollection, _super);

    CustomCollection.prototype.slug = "custom_collection";

    CustomCollection.prototype.prefix = "/custom_collections";

    function CustomCollection(site) {
      CustomCollection.__super__.constructor.call(this, site);
    }

    return CustomCollection;

  })(Base);

  module.exports = CustomCollection;

}).call(this);
