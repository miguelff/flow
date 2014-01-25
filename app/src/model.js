define(['jquery'], function ($) {

  var Working = {
    tick: function (elapsed, focus) {
      focus.units += elapsed;
      if (focus.units >= focus.limit) {
        focus.units = focus.limit;
        $(document).trigger('flow.tickDone');
        $(document).trigger('flow.limitReached');
      } else {
        $(document).trigger('flow.tickDone');
      }
    },

    count: function (focus) {
      return focus.units;
    },

    stopped: function (focus) {
      return focus.units == focus.limit;
    },

    description: "working"
  };

  var Breaking = {
    tick: function (elapsed, focus) {
      focus.units -= Math.round((1 / (focus.factor)) * elapsed);
      if (focus.units <= 0) {
        focus.units = 0;
        $(document).trigger('flow.tickDone');
        $(document).trigger('flow.zeroReached');
      } else {
        $(document).trigger('flow.tickDone');
      }
    },

    count: function (focus) {
      return focus.units * (focus.factor);
    },

    stopped: function (focus) {
      return focus.units == 0;
    },

    description: "breaking"
  };

  /**
   * While ticked, a flow object adds time when
   * in working state, and substracts time in breaking state
   * at a certain factor.
   *
   * @param options an object that can contain the following values
   *
   * {
   *   factor: defaults to 1/3 and is the factor at which deaccumulates
   *            time in resting state
   *
   *   limit:  the maximum time it can accumulate while working
   *            (expressed in seconds) defaults to 90 minutes
   * }
   */
  function Flow(options) {
    var options = options || {};

    this.unitSize = options.unitSize || 1000;
    this.factor = options.factor || 1 / 3;
    this.limit = (options.limit || 90 * 60) * this.unitSize;

    this.reset();
  }

  Flow.prototype.reset = function () {
    this.units = 0;
    this.state = Breaking;
  };

  Flow.prototype.count = function () {
    return this.state.count(this);
  };

  Flow.prototype.tick = function (elapsed) {
    this.state.tick(elapsed, this);
  }

  Flow.prototype.switch = function () {
    (this.state === Working) ? this.break() : this.work();
    $(document).trigger('flow.switchDone');
  }

  Flow.prototype.break = function () {
    this.state = Breaking;
  }

  Flow.prototype.work = function () {
    this.state = Working;
  }

  Flow.prototype.status = function () {
    return this.state.description;
  }

  Flow.prototype.stopped = function () {
    return this.state.stopped(this);
  }

  return Flow;

});