define(function () {

  var _events = {};

  return {
    bind: function (event, callback) {
      _events = _events || {};
      _events[event] = _events[event] || [];
      _events[event].push(callback);
    },

    unbind: function (event, callback) {
      _events = _events || {};
      if (event in _events === false)    return;
      _events[event].splice(_events[event].indexOf(callback), 1);
    },

    trigger: function (event /* , args... */) {
      _events = _events || {};
      if (event in _events === false)    return;
      for (var i = 0; i < _events[event].length; i++) {
        _events[event][i].apply(this, Array.prototype.slice.call(arguments, 1));
      }
    }
  };

});
