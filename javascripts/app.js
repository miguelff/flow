require.config({

  baseUrl: 'javascripts/lib',

  shim: {
    'soundjs': {
      exports: 'createjs.Sound'
    },

    'preload': {
      exports: 'createjs.LoadQueue'
    },

    'class': {
      exports: 'Class'
    },

    'hogan': {
      exports: 'Hogan'
    }
  },

  paths: {
    models:   '../src/models',
    views:    '../src/views',
    templates:'../src/templates',
    util:     '../src/util',
    app:      '../src'
  }
});

// Start the main app logic.
requirejs(['jquery', 'class', 'app/Mediator'], function ($, Class, Mediator) {
  Mediator.setup('Chronometer');
});