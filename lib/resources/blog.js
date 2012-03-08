(function() {
  var Blog, request;

  request = require('request');

  Blog = (function() {

    function Blog(key, pass, shop) {
      this.key = key;
      this.pass = pass;
      this.shop = shop;
      if (!(pass != null) || !(key != null) || !(shop != null)) {
        throw new Error('Blog missing parameters');
      }
    }

    Blog.prototype.all = function(cb) {
      return request("http://" + this.shop + ".myshopify.com", function(err, response, body) {
        return process.nextTick(function() {
          return cb(null, JSON.parse(body));
        });
      });
    };

    return Blog;

  })();

  module.exports = Blog;

}).call(this);
