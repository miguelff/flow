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
    theme: Url.param('theme') || 'bubble',

    modelOptions: {
      limit: Url.param("limit") || 60 * 60,
      factor: Url.param("factor") || .3
    }
  });

});