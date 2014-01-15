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
    }
  },

  paths: {
    models: '../src/models',
    views:  '../src/views',
    app:    '../src'
  }
});

// Start the main app logic.
requirejs(['jquery', 'class', 'app/mediator'], function ($, Class, Mediator) {
  Mediator.setup('SimpleChronometer');
});