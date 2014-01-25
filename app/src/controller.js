define(['infrastructure/event-emitter'], function (EventEmitter) {

  return {
    init: function (options) {
      var options = options || {};
      options.theme = options.theme || 'chronometer';

      require(['app/model', 'app/view', 'themes/' + options.theme + '/theme.js'], function (Model, View, Theme) {
        var model = Model.init(options.modelOptions),
            view = View.extend(Theme).init(model, options.viewOptions);

        EventEmitter.bind('flow.zeroReached', function () {
          view.zeroReached();
        });

        EventEmitter.bind('flow.limitReached', function () {
          view.limitReached();
        });

        EventEmitter.bind('flow.switchRequested', function () {
          model.switch();
        });

        EventEmitter.bind('flow.switchDone', function () {
          view.refresh();
        });

        EventEmitter.bind('flow.tickDone', function () {
          view.refresh();
        });

        $(document).ready(function () {
          view.load();
          var worker = new Worker('src/workers/tick.js');
          worker.addEventListener('message', function (e) {
            if (!model.stopped()) {
              model.tick(e.data);
            }
          }, false);
        });
      });
    }
  };
});