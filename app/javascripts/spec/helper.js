require.config({

  baseUrl: 'javascripts/lib',

  shim: {
    'jasmine-2.0.0/boot' : {
      exports: 'jasmine'
    }
  },

  paths: {
    models: '../src/model',
    views: '../src/views',
    spec: '../spec'
  }
});

var specs = [
  'spec/models/flowSpec'
]
// Start the main app logic, eager loading the main model and all views
requirejs(['jquery', 'jasmine-2.0.0/boot'], function ($) {
  $(function () {
    require(specs, function (specs) {
      window.onload();
    });
  });
});
