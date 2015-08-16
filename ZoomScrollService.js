var ZoomScrollService = function(options){

  var viewport = options.viewport;
  //viewport.css('overflow', 'hidden');
  //viewport.width(400).height(400);
  viewport.mCustomScrollbar({
    axis: "xy"
  });

  /*// all are ko observables
  this.viewport = options.viewport;
  this.content = options.content;

  // scalars
  this.zoomValue = 1;
  this.originalContentSize = {
    w: content.width(),
    h: content.height()
  }

  // callbacks
  this.


  // prepare styling
  this.contentSize = {
    w: ko.observable(content.width()),
    h: ko.observable(content.height())
  };

  this.viewportSize = {
    w: ko.observable(viewport.width()),
    h: ko.observable(viewport.height())
  };

*/
}
