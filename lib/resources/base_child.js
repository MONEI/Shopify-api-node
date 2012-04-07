(function() {
  var BaseChild;

  BaseChild = (function() {

    BaseChild.prototype.parent = "/parent";

    BaseChild.prototype.slug = "base";

    BaseChild.prototype.child = "/base";

    BaseChild.prototype.resource = require('../resource');

    function BaseChild(site) {
      this.prefix = "" + site + this.parent;
    }

    BaseChild.prototype.all = function(parentId, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child, params);
      return this.resource.get(url, "" + this.slug + "s", callback);
    };

    BaseChild.prototype.count = function(parentId, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child + "/count", params);
      return this.resource.get(url, "count", callback);
    };

    BaseChild.prototype.get = function(parentId, id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child + "/" + id, params);
      return this.resource.get(url, this.slug, callback);
    };

    BaseChild.prototype.create = function(parentId, fields, callback) {
      var url;
      if (fields.title == null) callback(new Error('Title is required'));
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child);
      return this.resource.post(url, this.slug, fields, callback);
    };

    BaseChild.prototype.update = function(parentId, id, fields, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child + "/" + id);
      return this.resource.put(url, this.slug, fields, callback);
    };

    BaseChild.prototype["delete"] = function(parentId, id, callback) {
      var url;
      if (id == null) callback(new Error('missing'));
      url = this.resource.queryString("" + this.prefix + "/" + parentId + this.child + "/" + id);
      return this.resource["delete"](url, id, callback);
    };

    return BaseChild;

  })();

  module.exports = BaseChild;

}).call(this);
