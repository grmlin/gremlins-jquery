(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("jquery"));
	else if(typeof define === 'function' && define.amd)
		define(["jquery"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("jquery")) : factory(root["$"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $ = __webpack_require__(1);

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
	    throw new TypeError('Event \'' + event + '\' can\'t be bound, the event handler is missing');
	  }
	  if (typeof event !== 'string') {
	    throw new TypeError('Event selectors have to be referenced by strings!');
	  }

	  var firstWhitespace = event.indexOf(' '),
	      isDelegated = firstWhitespace !== -1,
	      eventType = isDelegated ? event.substr(0, firstWhitespace) : event,
	      target = isDelegated ? event.substr(firstWhitespace + 1) : null;

	  spec.$el.on(eventType, target, function (e) {
	    handler.call(spec, e, this);
	  });
	}

	module.exports = {
	  initialize: function initialize() {
	    this.$el = $(this.el);
	    addElements(this);
	    addEvents(this);
	  }
	};

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }
/******/ ])
});
;