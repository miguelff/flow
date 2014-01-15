/**
 * Base
 *
 * Provides common behaviour for all views
 * Children should define the following properties:
 *  - createContainer: creates the HTML structure for holding view elements
 *  - repaint: refreshes the content rendered on the browser
 */
define(['jquery','class'], function ($, Class) {

  var _runLoop = function(view){
    (function () {
      view.flow.tick();
      view.repaint();
      if (!view.flow.finished()) {
        setTimeout(arguments.callee, 1000);
      }
    })();
  }

  var Base = Class.extend({

    init: function (flow) {
      this.flow = flow;
      this.installHandlers();
    },

    setup: function () {
      var view = this;
      view.repaint();
      setTimeout(function(){_runLoop(view)},1000);
    },

    installHandlers: function () {
      var view = this;

      $(document).on("click", function (e) {
        if (view.flow.finished()){
          view.flow.switch();
          view.setup();
        }else{
          view.flow.switch();
        }
        $("body").removeClass();
        $("body").addClass(view.flow.status());
        e.preventDefault();
      });
    }
  });

  return Base;
});