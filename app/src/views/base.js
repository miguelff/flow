/**
 * Base
 *
 * Provides common behaviour for all views
 * Children should define the following properties:
 *  - createContainer: creates the HTML structure for holding view elements
 *  - repaint: refreshes the content rendered on the browser
 */
define(['jquery','class'], function ($, Class) {

  var Base = Class.extend({
    init: function (flow) {
      this.flow = flow;
    },

    load: function(){
      this.draw();
      this.installHandlers();
    }
  });

  return Base;
});