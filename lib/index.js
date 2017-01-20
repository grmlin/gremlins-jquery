'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function addElements(spec) {
  if (_typeof(spec.elements) === 'object') {
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
  if ((typeof eventObj === 'undefined' ? 'undefined' : _typeof(eventObj)) === 'object') {
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
    throw new TypeError('Event \'' + event + '\' can\'t be bound to <' + spec.name + '>, the event handler \'' + spec.events[event] + '\' is missing');
  }
  if (typeof event !== 'string') {
    throw new TypeError('Event selectors have to be referenced by strings!');
  }

  function cb(e) {
    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    return handler.call.apply(handler, [spec, e].concat(params));
  }

  var firstWhitespace = event.indexOf(' '),
      isDelegated = firstWhitespace !== -1,
      eventType = isDelegated ? event.substr(0, firstWhitespace) : event,
      target = isDelegated ? event.substr(firstWhitespace + 1) : cb,
      callback = isDelegated ? cb : undefined;

  spec.$el.on(eventType, target, callback);
}

module.exports = {
  created: function created() {
    this.$el = (0, _jquery2.default)(this);
    addElements(this);
    addEvents(this);
  }
};