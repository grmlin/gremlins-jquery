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

```js
var $ = require('jquery'),
  gremlins = require('gremlins'),
  gremlinsJquery = require('gremlins-jquery')($);
  
gremlins.create({
    mixins: [gremlinsJquery],
    name: 'foo',
    initialize() {
       this.$el.text('foo is here!');
    }
});
```