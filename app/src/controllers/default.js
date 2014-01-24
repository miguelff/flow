define(['jquery'], function($) {

  var configRoutes = function(controller, model, view){
    $(document).on('flow.zeroReached', function() {
      view.zeroReached();
    });

    $(document).on('flow.limitReached', function() {
      view.limitReached();
    });

    $(document).on('flow.switchRequested', function(){
      model.switch();
    });

    $(document).on('flow.switchDone', function(){
      view.refresh();
    });

    $(document).on('flow.tickDone', function(){
      view.refresh();
    });

    $(document).ready(function(){
      view.load();
      var worker = new Worker('src/controllers/tick.js');
      worker.addEventListener('message', function(e) {
        if(!model.stopped()){
          model.tick(e.data);
        }
      }, false);
    });
  }

  var DefaultController = {
    init: function(options) {
      var options = options || {};
      options.theme = options.theme || 'chronometer';

      require(['models/flow', 'themes/'+options.theme+'/view.js'], function(Flow, View){
        var model = new Flow(options.modelOptions),
            view  = new View(model, options.viewOptions);

        configRoutes(this, model, view);
      });
    }
  };

  return DefaultController;

});