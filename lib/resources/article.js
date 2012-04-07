(function() {
  var Article, BaseChild,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  BaseChild = require('./base_child');

  Article = (function(_super) {

    __extends(Article, _super);

    Article.prototype.parent = "/blogs";

    Article.prototype.slug = "article";

    Article.prototype.child = "/articles";

    function Article(site) {
      Article.__super__.constructor.call(this, site);
    }

    return Article;

  })(BaseChild);

  module.exports = Article;

}).call(this);
