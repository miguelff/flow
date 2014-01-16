define(function(){

  var Working = {
    tick: function(focus) {
      focus.units += focus.unitSize
      if (focus.units  >= focus.limit) {
        focus.units = focus.limit;
        focus.limitReached();
      }
    },

    count: function(focus){
      return focus.units;
    },

    finished: function(focus) {
      return focus.units == focus.limit;
    },

    description: "working"
  };

  var Breaking = {
    tick:  function(focus) {
      focus.units -= Math.round((1 / (focus.factor)) * focus.unitSize);
      if (focus.units <= 0) {
        focus.units = 0;
        focus.zeroReached();
      }
    },

    count: function(focus){
      return focus.units * (focus.factor);
    },

    finished: function(focus) {
      return focus.units == 0;
    },

    description: "breaking"
  };

  /**
   * A flow object accumulates time while in working
   * state, and deaccumulates time in breaking state
   * at a certain factor
   *
   * Usually the quantity is time expressed in seconds
   * @param options an object that can contain the following values
   *
   * {
   *   factor: defaults to 1/3 and is the factor at which deaccumulates time in resting state
   *   limit:  the maximum time it can accumulate while working (expressed in seconds) defaults to 90 minutes
   * }
   */
  function Flow(options){
    var options   = options || {};

    this.unitSize = 1000;
    this.factor   = options.factor  || 1/3;
    this.limit    = (options.limit  || 90 * 60) * this.unitSize;

    this.reset();
  }

  Flow.prototype.reset = function() {
    this.units = 0;
    this.state = Breaking;
    this.limitCallbacks = [];
    this.zeroCallbacks  = [];
  };

  Flow.prototype.count = function() {
    return this.state.count(this);
  };

  Flow.prototype.tick = function() {
    this.state.tick(this);
  }

  Flow.prototype.switch = function(){
    (this.state === Working) ? this.break() : this.work();
  }

  Flow.prototype.break = function(){
    this.state = Breaking;
  }

  Flow.prototype.work = function(){
    this.state = Working;
  }

  Flow.prototype.status = function(){
    return this.state.description;
  }

  Flow.prototype.finished = function() {
    return this.state.finished(this);
  }

  Flow.prototype.limitReached = function(){
    for (var callback in this.limitCallbacks) {
      this.limitCallbacks[callback](this);
    }
  }

  Flow.prototype.zeroReached = function(){
    for (var callback in this.zeroCallbacks) {
      this.zeroCallbacks[callback](this);
    }
  }

  Flow.prototype.onLimitReached = function(callback) {
    this.limitCallbacks.push(callback);
  };

  Flow.prototype.onZeroReached = function(callback) {
    this.zeroCallbacks.push(callback);
  };

  return Flow;
});