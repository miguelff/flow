/**
 * BaseView
 *
 * Provides common behaviour for all views
 * Children should define the following properties:
 *  - createContainer: creates the HTML structure for holding view elements
 *  - repaint: refreshes the content rendered on the browser
 */
define(['jquery'], function($) {

  var BaseView = function(flow){
    this.flow = flow;
    this.installHandlers();
  };

  BaseView.prototype.setup = function() {
    var view = this;
		view.createContainer();

    (function () {
      view.repaint(true);
      view.flow.tick();
      setTimeout(arguments.callee, 1000);
    })();
  };

  BaseView.prototype.installHandlers = function(){
    var view = this;

    $(document).on("click", function (e) {
      view.flow.switch();
      view.repaint();
      $("body").removeClass();
      $("body").addClass(view.flow.status());
      e.preventDefault();
    });
  };

  return BaseView;

});