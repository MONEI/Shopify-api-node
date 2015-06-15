(function() {
  var BaseChild, Asset,
  __hasProp = Object.prototype.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Asset = (function(_super) {

     __extends(Asset, _super);

  	Asset.prototype.parent = "/themes";

    Asset.prototype.slug = "asset";

    Asset.prototype.child = "/assets";

    function Asset(site) {
       Asset.__super__.constructor.call(this, site);
    }

    Asset.prototype.all = function(parentId, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = "" + this.prefix + "/" + parentId + this.child + "?" + params;

      return this.resource.get(url, "" + this.slug , callback);
    };
    Asset.prototype.update = function(parentId, fields, callback) {
      var url;
      if (parentId == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child );
      return this.resource.put(url, this.slug, fields, callback);
    };

    return Asset;

  })(BaseChild);

  module.exports = Asset;

}).call(this);
