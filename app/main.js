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
    util:        '../src/util',
    app:         '../src',
    themes:      '../themes'
  }
});

requirejs(['app/controller', 'util/url'], function (Controller, Url) {

  Controller.init({
    theme: 'chronometer',

    modelOptions: {
      // 1 fps
      limit : parseInt(Url.param("limit"))    || 60 * 60,
      factor: parseFloat(Url.param("factor")) || .3
    }
  });

});