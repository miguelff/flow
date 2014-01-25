require.config({

  baseUrl: 'lib',

  paths: {

  },

  shim: {
    'jasmine-2.0.0/jasmine': {
      exports: 'jasmine'
    },
    'jasmine-2.0.0/jasmine-jquery': {
      deps: ['jasmine-2.0.0/boot'],
      exports: 'jasmine'
    },
    'jasmine-2.0.0/jasmine-html': {
      deps: ['jasmine-2.0.0/jasmine'],
      exports: 'jasmine'
    },
    'jasmine-2.0.0/boot' : {
      deps: ['jasmine-2.0.0/jasmine-html'],
      exports: 'jasmine'
    }
  },

  paths: {
    app: '../src',
    infrastructure: '../src/infrastructure',
    spec: '../spec'
  }
});

var specs = [
  'spec/model'
]
// Start the main app logic, eager loading the main model and all views
requirejs(['jasmine-2.0.0/jasmine-jquery'], function () {
  $(function () {
    require(specs, function (specs) {
      window.onload();
    });
  });
});