### Design ###

* Paint the basic design
* Add icons for iOS and OSX
* Paint boot animation
* Paint flip animation

### Development ####

* Add Fluid support `if(window.fluid) window.fluid.dockBadge = formatted;`
* Add Fluid support `if(window.fluid) window.fluid.showGrowlNotification({title: prompt});`
* Add title `window.document.title = "Flow" + " (" + formatted + ")";`
* Add sounds for maximum coolness
* Rid-off Class abstraction, refactor code using modules and mixins or just functions
* Make mediator take options from URL
* Markup should be generated in a view (not in the view itself but in an associated template
* Jasmine coping well with requirejs
* A view should rather be an Interaction => Input handling, Presentation (templates and rendering and sound)
