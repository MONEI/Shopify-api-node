(function() {
  var Base;

  Base = (function() {

    Base.prototype.slug = "base";

    Base.prototype.prefix = "/base";

    Base.prototype.resource = require('../resource');

    function Base(site) {
      this.prefix = "" + site + this.prefix;
    }

    Base.prototype.all = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString(this.prefix, params);
      return this.resource.get(url, "" + this.slug + "s", callback);
    };

    Base.prototype.count = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString("" + this.prefix + "/count", params);
      return this.resource.get(url, "count", callback);
    };

    Base.prototype.get = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id, params);
      return this.resource.get(url, this.slug, callback);
    };

    Base.prototype.create = function(fields, callback) {
      var url;
      url = this.resource.queryString(this.prefix);
      return this.resource.post(url, this.slug, fields, callback);
    };

    Base.prototype.update = function(id, fields, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id);
      return this.resource.put(url, this.slug, fields, callback);
    };

    Base.prototype["delete"] = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing'));
      url = this.resource.queryString("" + this.prefix + "/" + id);
      return this.resource["delete"](url, id, callback);
    };

    return Base;

  })();

  module.exports = Base;

}).call(this);
