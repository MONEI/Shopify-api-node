(function() {
  var Blog, Order, Product, Resource, Session, SessionOAuth,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Blog = require('./resources/blog');

  Product = require('./resources/product');

  Order = require('./resources/order');

  Resource = require('./resource');

  Session = require('./session');

  SessionOAuth = (function(_super) {

    __extends(SessionOAuth, _super);

    function SessionOAuth(store_name, api_key, secret, persistent_token) {
      this.store_name = store_name;
      this.api_key = api_key;
      this.secret = secret;
      this.persistent_token = persistent_token != null ? persistent_token : null;
      SessionOAuth.__super__.constructor.call(this, this.store_name, this.api_key, this.secret);
      this.registerOAuthToken();
    }

    SessionOAuth.prototype.onRedirectUrl = function(url, cb) {
      var _this = this;
      return url.replace(/\?code=[\w\d]+/, function(code) {
        var temp_token;
        temp_token = code.split('=')[1];
        return _this.requestPermanentAccessToken(temp_token, function(persistent_token) {
          _this.persistent_token = persistent_token;
          _this.registerOAuthToken();
          return process.nextTick(function() {
            return cb();
          });
        });
      });
    };

    SessionOAuth.prototype.requestPermanentAccessToken = function(temp_token, cb) {
      var params,
        _this = this;
      params = "client_id=" + this.api_key + "&client_secret=" + this.secret + "&code=" + temp_token;
      return Resource.post("" + (this.site()) + "/oauth/access_token", 'oauth', params, function(err, response) {
        if (err != null) {
          throw err;
          return;
        }
        response = JSON.parse(response);
        return process.nextTick(function() {
          return cb(response.access_token);
        });
      });
    };

    SessionOAuth.prototype.site = function() {
      return "" + this.protocol + "://" + this.store_name + ".myshopify.com/admin";
    };

    SessionOAuth.prototype.registerOAuthToken = function() {
      if (this.persistent_token !== null) {
        return Resource.setOAuthToken(this.persistent_token);
      }
    };

    return SessionOAuth;

  })(Session);

  module.exports = SessionOAuth;

}).call(this);
