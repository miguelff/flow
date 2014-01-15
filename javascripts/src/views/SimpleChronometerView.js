define(['views/BaseView', 'jquery', 'preload', 'soundjs'], function(BaseView, $, Preload, Sound) {

  Sound.registerSound({id:"tick", src:"sounds/tick.wav"});
  Sound.registerSound({id:"done", src:"sounds/tick.wav"});

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

  var SimpleChronometerView  = BaseView.extend({
    init: function(flow){
      this._super(flow);
    },

    setup: function() {
      this._super();
      this.flow.onLimitReached(function(){Sound.play("done");});
      this.flow.onZeroReached(function(){Sound.play("tick");});
    },

    repaint: function() {
      var time = _millisToTime(this.flow.count());
      $("#feedback").html(time);
      $("#feedback").attr('data-percent', _percent(this.flow.units, this.flow.limit));
      window.document.title = "Flow" + " (" + time + ")";
    },

    createContainer: function(){
      $("body").html('<p id="feedback"></p>');
    }
  });

  return SimpleChronometerView;
});