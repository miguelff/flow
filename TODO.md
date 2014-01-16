### Design ###

* Paint flip animation or scale or both
* Try out blend modes for better transitions
* Try to hide and show time between start/pause
* Paint boot animation, will need some js here
* Add icons for iOS and OSX

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
