define(['jquery', 'views/base', 'util/all'], function($, Base, Util) {

  Util.Sound.registerSound({id:"tick", src:"sounds/tick.wav"});
  Util.Sound.registerSound({id:"done", src:"sounds/done.wav"});

  var _millisToTime = function(millis) {
    var ss = Math.floor(millis / 1000) % 60,
        mm = Math.floor(millis / (60 * 1000));
    return (mm < 10 ? '0': '') + mm +':'+ (ss < 10 ? '0' : '') + ss;
  };

  var _presenter = function (view){
    var f       = view.flow,
        status  = f.status(),
        percent = Math.round((f.units / f.limit) * 10000) / 100,
        time    = (status == 'breaking' && percent > 0  ? '-'     : ''    ) + _millisToTime(f.count()),
        text    = (status == 'working'  && percent > 0) ? 'Rest'  : 'Work';

    return  {status: status, time: time, percent: percent, buttonText: text};
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
    $('.button').html(presenter.buttonText);
    _changeTitle(presenter.time);
  }

  var Chronometer  = Base.extend({
    init: function(flow){
      this._super(flow);
    },

    setup: function() {
      this._super();
      this.flow.break();
      _fullRepaint(this);
      this.flow.onLimitReached(function(){Util.Sound.play("done");});
      this.flow.onZeroReached(function(){Util.Sound.play("tick");});
    },

    installHandlers: function(){
      this._super();
      $(document).on('click','.button', function(e){
        $(this).trigger('flow.switch');
        e.preventDefault();
      });
    },

    repaint: function() {
      _partialRepaint(this);
    }
  });

  return Chronometer;
});