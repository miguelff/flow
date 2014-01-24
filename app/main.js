require.config({

  baseUrl: 'lib',

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
    themes:      '../themes'
  }
});

// Start the main app logic, eager loading the main model and all views
requirejs(['controllers/default', 'util/url'], function (Controller, Url) {
  Controller.init({
    theme: 'chronometer',

    modelOptions: {
      // 1 fps
      limit : parseInt(Url.param("limit"))    || 60 * 60,
      factor: parseFloat(Url.param("factor")) || .3
    }
  });
});