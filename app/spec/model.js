define(['app/model'], function (Model) {

  describe('model', function () {

    describe('instantiation', function () {

      it('sets default values when options not provided', function () {
        var model = Model.init();
        expect(model.factor).toBe(1 / 3);
        expect(model.limit).toBe(90 * 60 * 1000)
      });

      it('sets provided options', function () {
        var model = Model.init({factor: .5, limit: 100});
        expect(model.factor).toBe(1 / 2);
        expect(model.limit).toBe(100 * 1000);
      });

    });

    describe('workflow', function () {

      var flow;

      beforeEach(function(){
        flow = Model.init({limit: 60, factor: .5});
        spyOn(flow.emitter, 'trigger');
      });

      it('status', function() {
        expect(flow.status()).toBe('breaking');
      });

      it('switch', function () {
        flow.switch();
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.switchDone');
        expect(flow.status()).toBe('working');
      });

      it('tick on working', function(){
        flow.switch();
        flow.tick(2000);
        flow.tick(3500);
        expect(flow.count()).toBe(5500);
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.tickDone');
      });

      it('tick on breaking', function(){
        flow.units = 10000
        flow.tick(2000);
        expect(flow.count()).toBe(3000);
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.tickDone');
      });

      it('upper limit reached', function(){
        flow.switch();
        flow.tick(100000);
        expect(flow.count()).toBe(flow.limit);
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.tickDone');
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.limitReached');
      });

      it('lower limit reached', function(){
        flow.units = 10000
        flow.tick(5000);
        expect(flow.count()).toBe(0);
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.tickDone');
        expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.zeroReached');
      });

      it('stopped while breaking', function(){
        expect(flow.stopped()).toBe(true);
        flow.units = 1;
        expect(flow.stopped()).toBe(false);
      });

      it('stopped while working', function(){
        flow.switch();
        expect(flow.stopped()).toBe(false);
        flow.tick(flow.limit);
        expect(flow.stopped()).toBe(true);
      });

      describe('avoid fractions of seconds on lower limit', function(){

        it('less then a second left', function(){
          flow.units = 10000
          flow.factor = 1
          flow.tick(9900);
          expect(flow.count()).toBe(0);
          expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.zeroReached');
        });

        it('at least a second left', function(){
          flow.units = 10000
          flow.factor = 1
          flow.tick(9000);
          expect(flow.count()).toBe(1000);
          expect(flow.emitter.trigger).not.toHaveBeenCalledWith('flow.zeroReached');
        });
      });

      describe('avoid fractions of seconds on upper limit', function(){

        it('less then a second left', function(){
          flow.limit = 10000
          flow.switch();
          flow.tick(9900);
          expect(flow.count()).toBe(10000);
          expect(flow.emitter.trigger).toHaveBeenCalledWith('flow.limitReached');
        });

        it('at least a second left', function(){
          flow.limit = 10000
          flow.switch();
          flow.tick(9000);
          expect(flow.count()).toBe(9000);
          expect(flow.emitter.trigger).not.toHaveBeenCalledWith('flow.limitReached');
        });
      });
    });
  });
});



