(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.gremlinsJquery = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

function addElements(spec) {
	if (typeof spec.elements === "object") {
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
	if (typeof eventObj === "object") {
		var event;
		for (event in eventObj) {
			if (eventObj.hasOwnProperty(event)) {
				bindEvent(spec, spec[eventObj[event]], event);
			}
		}
	}
}

function bindEvent(spec, handler, event) {
	if (typeof handler !== "function") {
		throw new TypeError("Event '" + event + "' can't be bound, the event handler is missing");
	}
	if (typeof event !== "string") {
		throw new TypeError("Event selectors have to be referenced by strings!");
	}

	var firstWhitespace = event.indexOf(" "),
	    isDelegated = firstWhitespace !== -1,
	    eventType = isDelegated ? event.substr(0, firstWhitespace) : event,
	    target = isDelegated ? event.substr(firstWhitespace + 1) : null;

	spec.$el.on(eventType, target, function (e) {
		handler.call(spec, e, this);
	});
}

module.exports = function ($) {
	if ($ === undefined || typeof $ !== "function") {
		throw new Error("You have to provide the jQuery namespace");
	}
	return {
		initialize: function initialize() {
			this.$el = $(this.el);
			addElements(this);
			addEvents(this);
		}
	};
};

},{}]},{},[1])(1)
});