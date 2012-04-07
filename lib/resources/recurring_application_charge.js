(function() {
  var Base, RecurringApplicationCharge,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  RecurringApplicationCharge = (function(_super) {

    __extends(RecurringApplicationCharge, _super);

    RecurringApplicationCharge.prototype.slug = "recurring_application_charge";

    RecurringApplicationCharge.prototype.prefix = "/recurring_application_charges";

    function RecurringApplicationCharge(site) {
      RecurringApplicationCharge.__super__.constructor.call(this, site);
    }

    RecurringApplicationCharge.prototype.activate = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/activate");
      return this.resource.post(url, this.slug, callback);
    };

    return RecurringApplicationCharge;

  })(Base);

  module.exports = RecurringApplicationCharge;

}).call(this);
