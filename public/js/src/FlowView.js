var FlowView = function($) {

  var _installHandlers = function(view){
    $(document).on("click", function (e) {
      view.flow.switch();
      view.repaint(true);
      e.preventDefault();
    });
  };

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

  var Constructor = function(flow){
    this.flow = flow;
    _installHandlers(this);
  }

  Constructor.prototype.repaint = function(refreshBodyClass) {
    $("#feedback").html(_millisToTime(this.flow.count()));
    $("#feedback").attr('data-percent', _percent(flow.units, flow.limit));
    if (refreshBodyClass) {
      $("body").removeClass();
      $("body").addClass(flow.status());
    }
  };

  return Constructor;
}($);
