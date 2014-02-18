define(['jquery',
  'infrastructure/event-emitter',
  'util/all',
  'text!./template.html',
  'text!./stylesheet.css'],
    function ($, EventEmitter, Util, template, styles) {

      var limitFx = new Audio('themes/bubble/sounds/tick.wav'),
          zeroFx = new Audio('themes/bubble/sounds/done.wav');

      var _secondsToTime = function (seconds) {
        var ss = Math.floor(seconds) % 60,
            mm = Math.floor(seconds / 60);

        return (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
      };

      var _color = function (status, percent) {
        var from = (status == 'breaking') ? '#898F96' : '#5EAE22',
            to = (status == 'breaking') ? '#206EC8' : '#E7522D',
            total = 100 * 100,
            k = percent * 100;

        return Util.Color.interpolate(from, to, total, k);
      }

      var _scale = function (percent) {
        return (100 - (percent / 2)) / 100;
      }

      var _presenter = function (view) {
        var f = view.flow,
            millisPerSecond = 1000,
            status = f.status(),
            percent = Math.round((f.units / f.limit) * 100 * millisPerSecond) / millisPerSecond,
            seconds = Math.floor(f.count() / millisPerSecond),
            time = (status == 'breaking' && seconds > 0 ? '-' : '') + _secondsToTime(seconds),
            text = (status == 'working' && seconds > 0) ? 'Pause' : 'Play',
            color = _color(status, percent),
            scale = _scale(percent);

        return  {status: status, time: time, color: color, scale: scale, buttonText: text};
      }

      var _changeTitle = function (time) {
        window.document.title = "Flow" + " (" + time + ")";
      }

      return {
        draw: function () {
          var presenter = _presenter(this);
          $('#container').html(Util.render(template, presenter, {styles: styles}));
          _changeTitle(presenter.time);
        },

        installHandlers: function () {
          $(document).on("click", '.button', function (e) {
            EventEmitter.trigger('flow.switchRequested');
            e.preventDefault();
          });
        },

        refresh: function () {
          var presenter = _presenter(this),
              scale = presenter.scale;

          $('.chronometer').css({'background-color': presenter.color,
            '-webkit-transform': 'scale(' + scale + ',' + scale + ')',
            'transform': 'scale(' + scale + ',' + scale + ')'});

          $('.chronometer span').html(presenter.time);
          $('.button').html(presenter.buttonText);
          $('body').removeClass();
          $('body').addClass(presenter.status);

          _changeTitle(presenter.time);
        },

        limitReached: function () {
          limitFx.play();
        },

        zeroReached: function () {
          $('body').removeClass();
          zeroFx.play();
        }
      };
    });