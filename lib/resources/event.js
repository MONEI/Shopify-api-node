(function() {
  var Base, Event,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  Base = require('./base');

  Event = (function(_super) {

    __extends(Event, _super);

    Event.prototype.slug = "event";

    Event.prototype.prefix = "/events";

    function Event(site) {
      Event.__super__.constructor.call(this, site);
    }

    return Event;

  })(Base);

  module.exports = Event;

}).call(this);
