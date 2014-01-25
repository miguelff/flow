/**
 * View
 *
 * By extending it with a theme, the view will model
 * the interactions with flow.
 *
 * A view has to respond to:
 *  - draw()
 *  - refresh()
 *  - limitReached()
 *  - zeroReached()
 *
 * And raise the event 'flow.switchRequested' when
 * the user interacts with the view to request a change
 * in the flow direction (from working to breaking or viceversa)
 */
define(function () {

  return {
    init: function (flow, options) {
      this.flow = flow;
      this.options = options;
      return this;
    },

    load: function () {
      this.draw();
      this.installHandlers();
    },

    extend: function (theme) {
      var mixin = {};

      for(var prop in this) {
        mixin[prop] = this[prop];
      }

      for(var prop in theme) {
        mixin[prop] = theme[prop];
      }

      return mixin;
    }
  };
});