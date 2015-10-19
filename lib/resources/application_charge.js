(function() {
  var ApplicationCharge, Base,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  ApplicationCharge = (function(_super) {

    __extends(ApplicationCharge, _super);

    ApplicationCharge.prototype.slug = "application_charge";

    ApplicationCharge.prototype.prefix = "/application_charges";

    function ApplicationCharge(site) {
      ApplicationCharge.__super__.constructor.call(this, site);
    }

    ApplicationCharge.prototype.activate = function(id, fields, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/activate");
      return this.resource.post(url, this.slug, fields, callback);
    };

    return ApplicationCharge;

  })(Base);

  module.exports = ApplicationCharge;

}).call(this);
