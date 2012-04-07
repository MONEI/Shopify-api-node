(function() {
  var Base, Metafields, Page,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  Page = (function(_super) {

    __extends(Page, _super);

    Page.prototype.slug = "page";

    Page.prototype.prefix = "/pages";

    function Page(site) {
      this.metafields = new Metafields(this.prefix, site);
      Page.__super__.constructor.call(this, site);
    }

    Page.prototype.events = function(id, params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/events", params);
      return this.resource.get(url, "events", callback);
    };

    return Page;

  })(Base);

  module.exports = Page;

}).call(this);
