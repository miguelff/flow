define(['juration','infrastructure/event-emitter'], function (juration, EventEmitter) {

  var millisPerSec = 1000;

  var Breaking = function (model) {

    return {
      tick: function (elapsed) {
        model.units -= Math.round((1 / (model.factor)) * elapsed);
        if (model.units < (millisPerSec * model.factor)) {
          model.units = 0;
          model.emitter.trigger('flow.tickDone');
          model.emitter.trigger('flow.zeroReached');
        } else {
          model.emitter.trigger('flow.tickDone');
        }
      },

      count: function () {
        return model.units * (model.factor);
      },

      stopped: function () {
        return model.units == 0;
      },

      description: 'breaking'
    };
  }

  var Working = function (model) {

    return {
      tick: function (elapsed) {
        model.units += elapsed;
        if (model.units > model.limit - millisPerSec) {
          model.units = model.limit;
          model.emitter.trigger('flow.tickDone');
          model.emitter.trigger('flow.limitReached');
        } else {
          model.emitter.trigger('flow.tickDone');
        }
      },

      count: function () {
        return model.units;
      },

      stopped: function () {
        return model.units == model.limit;
      },

      description: "working"
    };
  }

  return {
    init: function (options) {
      var options = options || {};
      var limit = (options.limit || 90 * 60).toString();

      this.factor = options.factor || 1 / 3;
      this.limit = juration.parse(limit) * millisPerSec;
      this.units = 0;
      this.state = Breaking(this);
      this.emitter = EventEmitter;
      return this;
    },

    tick: function (elapsed) {
      this.state.tick(elapsed);
    },

    count: function () {
      return this.state.count();
    },

    status: function () {
      return this.state.description;
    },

    switch: function () {
      this.state = (this.status() === 'breaking') ? Working(this) : Breaking(this);
      this.emitter.trigger('flow.switchDone');
    },

    stopped: function () {
      return this.state.stopped();
    }
  };
});