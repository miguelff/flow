define(['jquery',
  'infrastructure/event-emitter',
  'util/all',
  'text!./template.html',
  'text!./stylesheet.css'],
    function ($, EventEmitter, Util, template, styles) {

      Util.Sound.registerSound({id: 'ping', src: 'themes/chronometer/sounds/ping.wav'});

      var _unitsToTime = function (units, precision) {
        var ss = Math.floor(units / precision) % 60,
            mm = Math.floor(units / (60 * precision));

        return (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
      };

      var _presenter = function (view) {
        var f = view.flow,
            millisPerSecond = 1000,
            status = f.status(),
            percent = Math.round((f.units / f.limit) * 100 * millisPerSecond) / millisPerSecond,
            secondsLeft = (f.limit - f.units) / millisPerSecond,
            time = (status == 'breaking' && percent > 0 ? '-' : ''    ) + _unitsToTime(f.count(), millisPerSecond),
            text = (status == 'working' && percent > 0) ? 'Rest' : 'Work';

        return  {status: status, time: time, wrapperClass: text, secondsLeft: secondsLeft, percent: percent};
      }

      var _changeTitle = function (time) {
        window.document.title = "Flow" + " (" + time + ")";
      }

      return {
        load: function () {
          this.draw();
          this.installHandlers();
          EventEmitter.trigger('flow.switchRequested');
        },

        draw: function () {
          var presenter = _presenter(this);
          $('#container').html(Util.render(template, presenter, {styles: styles}));
          _changeTitle(presenter.time);
        },

        installHandlers: function () {
          $(document).on("click", 'body', function (e) {
            EventEmitter.trigger('flow.switchRequested');
            e.preventDefault();
          });
        },

        refresh: function () {
          var presenter = _presenter(this);

          $('#chronometer span').html(presenter.time);
          $('#progress').css({width: presenter.percent+"%"});
          $('body').removeClass();
          $('body').addClass(presenter.status);

          _changeTitle(presenter.time);
        },

        limitReached: function () {
          Util.Sound.play('ping');
        },

        zeroReached: function () {
          $('body').removeClass();
          Util.Sound.play('ping');
        }
      };
    });