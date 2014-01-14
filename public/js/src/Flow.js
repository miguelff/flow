var Flow = (function() {

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

  function Constructor(factor, limit, unitSize){
    this.factor   = (typeof(factor)   !== "undefined") ? factor   : 2/3;
    this.limit    = (typeof(limit)    !== "undefined") ? limit    : 90 * 60 * 1000;
    this.unitSize = (typeof(unitSize) !== "undefined") ? unitSize : 1000;
    this.reset();
  }

  Constructor.prototype.reset = function() {
    this.units = 0;
    this.state = Working;
  };

  Constructor.prototype.count = function() {
    return this.state.count(this);
  };

  Constructor.prototype.tick = function() {
    this.state.tick(this);
  }

  Constructor.prototype.switch = function(){
    this.state = (this.state === Working) ? Breaking : Working;
  }

  Constructor.prototype.status = function(){
    return this.state.description;
  }

  return Constructor;

}());