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
    util: '../src/util',
    app: '../src',
    infrastructure: '../src/infrastructure',
    themes: '../themes'
  }
});

requirejs(['app/controller', 'util/url'], function (Controller, Url) {

  Controller.init({
    theme: Url.param('theme') || 'chronometer',

    modelOptions: {
      limit: parseInt(Url.param("limit")) || 60 * 60,
      factor: parseFloat(Url.param("factor")) || .3
    }
  });

});