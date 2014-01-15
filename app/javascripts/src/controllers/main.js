define(function() {

  /**
   * Dynamic setups the application based on the kind of view requested
   * @param view the name of the view, if name is Foo, it will require('views/FooView')
   * @private
   */
  var _setup = function(view){
    require(['models/flow', 'views/'+view], function(Flow, View){
      var flow = new Flow();
      var view = new View(flow);
      view.setup();
    });
  };

  var MainController = {
    setup: _setup
  };

  return MainController;
});