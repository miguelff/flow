define(['hogan', 'jquery', 'templates/all'], function(Hogan, $){

  return function(templateName, selector, bindings) {
      var template = require('text!templates/'+templateName+'.html');
      template = Hogan.compile(template);
      $(selector).html(template.render(bindings));
  };
});