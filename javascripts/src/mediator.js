define(function (require) {
  var Flow = require('models/Flow');

  /**
   * Dynamic setups the application based on the kind of view requested
   * @param view the name of the view, if name is Foo, it will require('views/FooView')
   * @private
   */
  var _setup = function(view){
    var flow = new Flow();
    require(['views/'+view+"View"], function(View){
      view = new View(flow);
      view.setup();
    });
  };

  var Mediator = {
    setup: _setup
  };

  return Mediator;
});