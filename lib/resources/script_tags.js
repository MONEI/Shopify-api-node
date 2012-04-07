(function() {
  var Base, ScriptTags,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  ScriptTags = (function(_super) {

    __extends(ScriptTags, _super);

    ScriptTags.prototype.slug = "script_tag";

    ScriptTags.prototype.prefix = "/script_tags";

    function ScriptTags(site) {
      ScriptTags.__super__.constructor.call(this, site);
    }

    return ScriptTags;

  })(Base);

  module.exports = ScriptTags;

}).call(this);
