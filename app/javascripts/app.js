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
    themes:      '../../themes'
  }
});

// Start the main app logic, eager loading the main model and all views
requirejs(['controllers/main'], function (main) {
  main({
    view: 'chronometer',

    modelOptions: {
      limit : 60,
      factor: 1/3
    }
  });
});