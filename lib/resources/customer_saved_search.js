(function() {
  var Base, CustomerSavedSearch,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  CustomerSavedSearch = (function(_super) {

    __extends(CustomerSavedSearch, _super);

    CustomerSavedSearch.prototype.slug = "customer_saved_search";

    CustomerSavedSearch.prototype.prefix = "/customer_saved_searches";

    function CustomerSavedSearch(site) {
      CustomerSavedSearch.__super__.constructor.call(this, site);
    }

    CustomerSavedSearch.prototype.all = function(params, callback) {
      var url, _ref;
      if (typeof params === 'function') {
        _ref = [callback, params], params = _ref[0], callback = _ref[1];
      }
      url = this.resource.queryString(this.prefix, params);
      return this.resource.get(url, "customer_saved_searches", callback);
    };

    CustomerSavedSearch.prototype.getCustomersForId = function(id, callback) {
      var url;
      if (id == null) callback(new Error('missing id'));
      url = this.resource.queryString("" + this.prefix + "/" + id + "/customers");
      return this.resource.get(url, "customers", callback);
    };

    return CustomerSavedSearch;

  })(Base);

  module.exports = CustomerSavedSearch;

}).call(this);
