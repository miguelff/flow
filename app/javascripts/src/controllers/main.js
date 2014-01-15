define(['models/flow', 'views/all'], function () {

  return function(view) {
    var Flow = require('models/flow');
    var View = require('views/' + view);

    var model   = new Flow();
    var view    = new View(model);

    view.setup();
    this.view   = view;

    return this;
  };
});