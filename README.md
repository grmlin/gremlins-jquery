gremlins-jquery
================

GREMLIN.JS jQuery mixin that supports event and element maps.


## Installation

### NPM

    $ npm install gremlins-jquery
    
make sure you have jQuery installed from npm, too.

## Usage

```html
<foo-gremlin>
    <p class="content"></p>
    <button>clicker</button>
</foo-gremlin>
```

```js
const gremlins = require('gremlins');
const gremlinsJquery = require('gremlins-jquery');
  
gremlins.create('foo-gremlin', {
    mixins: [gremlinsJquery],
    elements: {
      '.content': '$content'
    },
    events: {
      'click button': 'onClick'
    },
    created() {
      this.$el.addClass('ready');
    },
    onClick() {
      this.$content.text('foo is here!');
    }
});
```