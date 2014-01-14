### Design ###

* Paint the basic design
* Add Fluid support `if(window.fluid) window.fluid.dockBadge = formatted;`
* Add Fluid support `if(window.fluid) window.fluid.showGrowlNotification({title: prompt});`
* Add title `window.document.title = "Flow" + " (" + formatted + ")";`
* Add boot animation
* Add flip animation
* Add sounds for maximum coolness
* Add icons for iOS and OSX

### Development ####

* Jasmine coping well with requirejs
* Extract common behavior in views
* Make mediator take options from URL
* Markup should be generated in a view (not in the view itself but in an associated template
* A view should rather be an Interaction => Input handling, Presentation (templates and rendering and sound)