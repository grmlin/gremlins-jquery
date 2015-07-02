gremlinjs-jquery
================

gremlin.js jQuery mixin


## Installation

### NPM

    $ npm install gremlins-jquery
    
### Bower
    
    $bower install gremlins-jquery
    
### Classic

download from `dist` 

    <script src="gremlins-jquery.js" />

## Usage

```html
<foo-gremlin>
    <p class="content"></p>
    <button>clicker</button>
</foo-gremlin>
```

```js
var $ = require('jquery'),
  gremlins = require('gremlins'),
  gremlinsJquery = require('gremlins-jquery');
  
gremlins.create({
    mixins: [gremlinsJquery],
    name: 'foo',
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