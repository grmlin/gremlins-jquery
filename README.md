gremlinjs-jquery
================

gremlin.js jQuery mixin


## Installation

### NPM

    $ npm install gremlins-jquery

## Usage

```html
<foo-gremlin>
    <p class="content"></p>
    <button>clicker</button>
</foo-gremlin>
```

```js
const $ = require('jquery');
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
    initialize() {
       this.$el.addClass('ready');
    },
    onClick() {
      this.$content.text('foo is here!');
    }
});
```