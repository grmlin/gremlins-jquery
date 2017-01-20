'use strict';
import $ from 'jquery';

function addElements(spec) {
  if (typeof spec.elements === 'object') {
    for (var selector in spec.elements) {
      if (spec.elements.hasOwnProperty(selector)) {
        var prop = spec.elements[selector];
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
    throw new TypeError(`Event '${event}' can't be bound to <${spec.name}>, the event handler '${spec.events[event]}' is missing`);
  }
  if (typeof event !== 'string') {
    throw new TypeError('Event selectors have to be referenced by strings!');
  }

  function cb(e, ...params) {
    return handler.call(spec, e, ...params);
  }


  var firstWhitespace = event.indexOf(' '),
    isDelegated = firstWhitespace !== -1,
    eventType = isDelegated ? event.substr(0, firstWhitespace) : event,
    target = isDelegated ? event.substr(firstWhitespace + 1) : cb,
    callback = isDelegated ? cb : undefined;

  spec.$el.on(eventType, target, callback);
}

module.exports = {
  created() {
    this.$el = $(this);
    addElements(this);
    addEvents(this);
  }
};
