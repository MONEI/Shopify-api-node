(function() {
  var Asset;

  Asset = (function() {

  	Asset.prototype.slug = "asset";

    Asset.prototype.prefix = "/assets";

    function Asset() {}

    Asset.prototype.getWithKey = function(theme_id, asset_key, callback) {
      var url;
      if (theme_id == null) callback(new Error('missing theme_id'));
      url = this.resource.queryString("/themes/" + theme_id + this.prefix + "?" + asset_key);
      return this.resource.get(url, this.slug, callback);
    };

    Asset.prototype.update = function(theme_id, fields, callback) {
      var url;
      if (theme_id == null) callback(new Error('missing theme_id'));
      url = this.resource.queryString("/themes/" + theme_id + this.prefix);
      return this.resource.put(url, this.slug, fields, callback);
    };

    return Asset;

  })();

  module.exports = Asset;

}).call(this);
