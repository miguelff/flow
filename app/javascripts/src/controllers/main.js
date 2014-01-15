define(['require', 'models/flow', 'views/all'], function (r) {

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
    options.view = options.view || 'chronometer';

    var Flow  = r('models/flow'),
        View  = r('views/' + options.view);

    var model = new Flow(options.modelOptions),
        view  = new View(model, options.viewOptions);

    view.setup();
    this.view   = view;

    return this;
  };

  return MainController;
});