define(['require', 'hogan', 'templates/all'], function(r, Hogan){

  var compiledTemplates = {};

  return function(templateName, bindings) {
      var template = r('text!templates/'+templateName+'.html');
      compiledTemplates[template] = compiledTemplates[template] || Hogan.compile(template);
      var compiledTemplate = compiledTemplates[template];
      return compiledTemplate.render(bindings);
  };
});