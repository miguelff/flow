define(['require', 'models/flow', 'views/all'], function (r) {

  return function(view) {
    var Flow  = r('models/flow'),
        View  = r('views/' + view),
        model = new Flow(),
        view  = new View(model);

    view.setup();
    this.view   = view;

    return this;
  };
});