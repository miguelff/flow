define(['require', 'hogan'], function(r, Hogan){

  var compiledTemplates = {};

  return function(template, bindings, partials) {
      compiledTemplates[template] = compiledTemplates[template] || Hogan.compile(template);
      var compiledTemplate = compiledTemplates[template];
      return compiledTemplate.render(bindings, partials);
  };
});