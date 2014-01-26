var loop = function(last) {
  var current = new Date();
  self.postMessage(current - last);
  setTimeout(function(){loop(current)}, 17);
}
loop(new Date());