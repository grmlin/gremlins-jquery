'use strict';
var $ = require('jquery');

function addElements(spec) {
  if (typeof spec.elements === 'object') {
    for (var selector in spec.elements) {
      if (spec.elements.hasOwnProperty(selector)) {
        var prop   = spec.elements[selector];
        spec[prop] = spec.$el.find(selector);
      }
    }
  }
}

function addEvents(spec) {
  var eventObj = spec.events;
  if (typeof eventObj === 'object') {
    var event;
    for (event in eventObj) {
      if (eventObj.hasOwnProperty(event)) {
        bindEvent(spec, spec[eventObj[event]], event);
      }
    }
  }
}

function bindEvent(spec, handler, event) {
  if (typeof handler !== 'function') {
    throw new TypeError(`Event '${event}' can't be bound, the event handler is missing`);
  }
  if (typeof event !== 'string') {
    throw new TypeError('Event selectors have to be referenced by strings!');
  }

  var firstWhitespace = event.indexOf(' '),
      isDelegated     = firstWhitespace !== -1,
      eventType       = isDelegated ? event.substr(0, firstWhitespace) : event,
      target          = isDelegated ? event.substr(firstWhitespace + 1) : null;

  spec.$el.on(eventType, target, function (e) {
    handler.call(spec, e, this);
  });

}

module.exports = {
    initialize() {
      this.$el = $(this.el);
      addElements(this);
      addEvents(this);
    }
};
