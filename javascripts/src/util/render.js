define(function(){

  return function(templateName, selector, bindings) {
    require(['hogan', 'jquery', 'text!templates/'+templateName+'.html'], function(Hogan, $, template){
      var template = Hogan.compile(template);
      $(selector).html(template.render(bindings));
    });
  };
});