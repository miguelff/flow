define(function(){
  Element.prototype.on = Element.prototype.addEventListener;
  return document.querySelectorAll.bind(document);
});