(function () {
  self.postMessage('worker.tick');
  setTimeout(arguments.callee, 10);
})();