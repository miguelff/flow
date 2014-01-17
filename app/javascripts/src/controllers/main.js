define(function() {

  /**
   * The main controller function serves as
   * an entry point to the application
   *
   * options - options to configure it
   * {
   *  view: defaults to "chronomenter" - name of the view to render and handle interactions of the model
   *  modelOptions - options to build the model
   *  viewOptions - options to build the view, take a look at the specific view (e.g. chronometer)
   *  }
   *
   *  returns an instance of the controller, after being setup the application.
   */
  var MainController = function(options) {
    var options = options || {};
    options.theme = options.theme || 'chronometer';

    require(['models/flow', 'themes/chronometer/view.js'], function(Flow, View){
      var model = new Flow(options.modelOptions),
          view  = new View(model, options.viewOptions);

      view.setup();
      window.view = view
    });
  };

  return MainController;
});