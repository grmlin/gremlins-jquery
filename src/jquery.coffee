addElements = () ->
  if typeof @constructor.elements is 'object'
    for own selector, propertyName of @constructor.elements
      @[propertyName] = @$el.find(selector)

addEvents = () ->
  ctx = @
  if typeof @constructor.events is 'object'
    for own event, handlerName of @constructor.events
      do (handlerName, event) =>
        throw new TypeError "Event selectors have to be referenced by strings!" unless (typeof event is "string")

        if typeof @[handlerName] is "function"
          handler = @[handlerName]
        else
          throw new TypeError "Event '#{event}' can't be bound to '#{@name}.#{handlerName}', as the type is " + typeof @[handlerName]

        firstWhitespace = event.indexOf(" ")
        isDelegated = firstWhitespace isnt -1
        eventType = if isDelegated then event.substr(0, firstWhitespace) else event
        target = if isDelegated then event.substr(firstWhitespace + 1) else null


        @$el.on eventType, target, (e) ->
          handler.call(ctx, e, @)
          true
    true

Gremlin.Module 'jquery',
  extend: ->

  bind: (gremlinInstance) ->
    gremlinInstance.$el = $ gremlinInstance.el
    addElements.call gremlinInstance
    addEvents.call gremlinInstance