//@ sourceMappingURL=gremlin.jquery.map
(function() {
  var GremlinJQuery,
    __hasProp = {}.hasOwnProperty;

  GremlinJQuery = (function() {
    var addElements, addEvents;

    function GremlinJQuery() {}

    addElements = function() {
      var propertyName, selector, _ref, _results;
      if (typeof this.klass.elements === 'object') {
        _ref = this.klass.elements;
        _results = [];
        for (selector in _ref) {
          if (!__hasProp.call(_ref, selector)) continue;
          propertyName = _ref[selector];
          _results.push(this[propertyName] = this.$el.find(selector));
        }
        return _results;
      }
    };

    addEvents = function() {
      var ctx, event, handlerName, _fn, _ref,
        _this = this;
      ctx = this;
      if (typeof this.klass.events === 'object') {
        _ref = this.klass.events;
        _fn = function(handlerName, event) {
          var eventType, firstWhitespace, handler, isDelegated, target;
          if (!(typeof event === "string")) {
            throw new TypeError("Event selectors have to be referenced by strings!");
          }
          if (typeof _this[handlerName] === "function") {
            handler = _this[handlerName];
          } else {
            throw new TypeError(("Event '" + event + "' can't be bound to '" + _this.name + "." + handlerName + "', as the type is ") + typeof _this[handlerName]);
          }
          firstWhitespace = event.indexOf(" ");
          isDelegated = firstWhitespace !== -1;
          eventType = isDelegated ? event.substr(0, firstWhitespace) : event;
          target = isDelegated ? event.substr(firstWhitespace + 1) : null;
          return _this.$el.on(eventType, target, function(e) {
            handler.call(ctx, e, this);
            return true;
          });
        };
        for (event in _ref) {
          if (!__hasProp.call(_ref, event)) continue;
          handlerName = _ref[event];
          _fn(handlerName, event);
        }
        return true;
      }
    };

    GremlinJQuery.extend = function(AbstractGremlin) {
      return AbstractGremlin.IS_JQUERY = true;
    };

    GremlinJQuery.bind = function(gremlinInstance) {
      gremlinInstance.$el = $(gremlinInstance.el);
      addElements.call(gremlinInstance);
      return addEvents.call(gremlinInstance);
    };

    return GremlinJQuery;

  })();

  Gremlin.registerExtension(GremlinJQuery);

}).call(this);
