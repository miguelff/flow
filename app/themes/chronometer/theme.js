define(['jquery',
  'infrastructure/event-emitter',
  'util/render',
  'text!./template.html',
  'text!./stylesheet.css'],
    function ($, EventEmitter, render, template, styles) {

      var finishFx = new Audio('themes/chronometer/sounds/ping.wav');

      var _secondsToTime = function (seconds) {
        var ss = Math.floor(seconds) % 60,
            mm = Math.floor(seconds / 60);

        return (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
      };

      var _presenter = function (view) {
        var f = view.flow,
            millisPerSecond = 1000,
            status = f.status(),
            percent = Math.round((f.units / f.limit) * 100 * millisPerSecond) / millisPerSecond,
            secondsLeft = (f.limit - f.units) / millisPerSecond,
            seconds = Math.floor(f.count() / millisPerSecond),
            time = (status == 'breaking' && seconds > 0 ? '-' : ''    ) + _secondsToTime(seconds);

        return  {status: status, time: time, secondsLeft: secondsLeft, percent: percent};
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
          $('#container').html(render(template, presenter, {styles: styles}));
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
          finishFx.play('ping');
        },

        zeroReached: function () {
          $('body').removeClass();
          finishFx.play('ping');
        }
      };
    });