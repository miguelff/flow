define(['views/base', 'util/all'], function(Base, Util) {

  Util.Sound.registerSound({id:"tick", src:"sounds/tick.wav"});
  Util.Sound.registerSound({id:"done", src:"sounds/tick.wav"});

  var _millisToTime = function(millis) {
    var in_seconds = Math.floor(millis / 1000),
        in_minutes = Math.floor(in_seconds / 60);

    var seconds = in_seconds % 60,
        minutes = in_minutes;

    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return minutes+':'+seconds;
  };

  var _percent = function(units, limit) {
    return Math.round((units / limit) * 10000) / 100
  }

  var _presenter = function (view){
    var time    = _millisToTime(view.flow.count()),
        percent = _percent(view.flow.units, view.flow.limit),
        status  = view.flow.status();

    if (view.flow.status() == 'breaking') {
      time = '-' + time;
    }

    return  {status: status, time: time, percent: percent};
  }

  var _changeTitle = function(time){
    window.document.title = "Flow" + " (" + time + ")";
  }

  var _fullRepaint = function(view){
    var presenter = _presenter(view);
    $('#container').html(Util.render('chronometer', presenter));
    _changeTitle(presenter.time);
  }

  var _partialRepaint = function(view){
    var presenter = _presenter(view);
    $('.chronometer').attr('data-percent', presenter.percent);
    $('.chronometer span').html(presenter.time);
    _changeTitle(presenter.time);
  }

  var Chronometer  = Base.extend({
    init: function(flow){
      this._super(flow);
    },

    setup: function() {
      _fullRepaint(this);
      this._super();
      this.flow.onLimitReached(function(){Util.Sound.play("done");});
      this.flow.onZeroReached(function(){Util.Sound.play("tick");});
    },

    repaint: function() {
      _partialRepaint(this);
    }
  });

  return Chronometer;
});