(function() {
  var Article;

  Article = (function() {
    var blog;

    blog = null;

    function Article(opts) {
      if ((opts != null ? opts.blog : void 0) == null) {
        throw new Error('missing blog id');
      }
      blog = opts.blog;
    }

    return Article;

  })();

  module.exports = Article;

}).call(this);
