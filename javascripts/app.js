require.config({

  baseUrl: 'javascripts/lib',

  paths: {
    models: '../src/models',
    views:  '../src/views',
    app:    '../src'
  }
});

// Start the main app logic.
requirejs(['jquery', 'app/mediator'], function ($, Mediator) {
  Mediator.setup('SimpleChronometer');
});