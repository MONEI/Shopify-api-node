(function() {
  var Base, Metafields, WebHook,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Metafields = require('./metafield');

  WebHook = (function(_super) {

    __extends(WebHook, _super);

    WebHook.prototype.slug = "webhook";

    WebHook.prototype.prefix = "/webhooks";

    function WebHook(site) {
      this.metafields = new Metafields(this.prefix, site);
      WebHook.__super__.constructor.call(this, site);
    }

    return WebHook;

  })(Base);

  module.exports = WebHook;

}).call(this);
