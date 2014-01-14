define(function(){

  var Working = {
    tick: function(focus) {
      focus.units += focus.unitSize
      if (focus.units  >= focus.limit) {
        focus.units = focus.limit;
      }
    },

    count: function(focus){
      return focus.units;
    },

    description: "working"
  };

  var Breaking = {
    tick:  function(focus) {
      focus.units -= Math.round((1 / (1-focus.factor)) * focus.unitSize);
      if (focus.units <= 0) {
        focus.units = 0;
      }
    },

    count: function(focus){
      return focus.units * (1-focus.factor);
    },

    description: "breaking"
  };

  function Flow(factor, limit, unitSize){
    this.factor   = factor 		|| 2/3;
    this.limit    = limit  		|| 90 * 60 * 1000;
    this.unitSize = unitSize 	|| 1000;
    this.reset();
  }

  Flow.prototype.reset = function() {
    this.units = 0;
    this.state = Working;
  };

  Flow.prototype.count = function() {
    return this.state.count(this);
  };

  Flow.prototype.tick = function() {
    this.state.tick(this);
  }

  Flow.prototype.switch = function(){
    this.state = (this.state === Working) ? Breaking : Working;
  }

  Flow.prototype.status = function(){
    return this.state.description;
  }

  return Flow;
});