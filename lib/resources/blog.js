(function() {
  var Blog, get;

  get = require('http').get;

  Blog = (function() {

    function Blog(key, pass, shop) {
      if (!(pass != null) || !(key != null) || !(shop != null)) {
        throw new Error('Blog missing parameters');
      }
      this.options = (function() {
        return {
          hostname: "http://" + key + ":" + pass + "@" + shop + ".myshopify.com",
          path: "/admin"
        };
      })();
    }

    Blog.prototype.all = function(cb) {
      return get(this.options, function(res) {
        var response;
        response = '';
        console.log(res.headers);
        res.setEncoding('utf8');
        res.on('data', function(data) {
          return response += data;
        });
        return res.on('end', function() {
          var error;
          console.log(res);
          if (res.statusCode !== 200) {
            error = new Error('Request Error #{res.statusCode}');
          }
          return process.nextTick(function() {
            return cb(error, JSON.parse(response));
          });
        });
      });
    };

    return Blog;

  })();

  module.exports = Blog;

}).call(this);
