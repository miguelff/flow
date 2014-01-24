var loop = function(last) {
	var current = new Date();
  self.postMessage(current - last);
	setTimeout(function(){loop(current)}, 100);
}
loop(new Date());