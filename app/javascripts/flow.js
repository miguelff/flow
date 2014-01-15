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
    models:      '../src/model',
    views:       '../src/views',
    controllers: '../src/controllers',
    util:        '../src/util',
    app:         '../src',
    templates:   '../../templates'
  }
});

// Start the main app logic.
requirejs(['jquery', 'class', 'controllers/main'], function ($, Class, Main) {
  Main.setup('chronometer');
});