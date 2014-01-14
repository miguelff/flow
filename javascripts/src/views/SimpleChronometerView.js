define(['views/BaseView', 'jquery'], function(BaseView, $) {

  var _millisToTime = function(millis) {
    var in_seconds = Math.floor(millis / 1000),
        in_minutes = Math.floor(in_seconds / 60),
        in_hours   = Math.floor(in_minutes / 60);

    var seconds = in_seconds % 60,
        minutes = in_minutes % 60,
        hours   = in_hours;

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}

    return hours+':'+minutes+':'+seconds;
  };

  var _percent = function(units, limit) {
    return Math.round((units / limit) * 10000) / 100
  }

  var SimpleChronometerView  = function(flow){
    BaseView.call(this, flow);
  }

  SimpleChronometerView.prototype = Object.create(BaseView.prototype);

  SimpleChronometerView.prototype.createContainer = function() {
      $("#container").html('<p id="feedback"/>');
  };

  SimpleChronometerView.prototype.repaint = function() {
    $("#feedback").html(_millisToTime(this.flow.count()));
    $("#feedback").attr('data-percent', _percent(this.flow.units, this.flow.limit));
  };

  return SimpleChronometerView;
});
