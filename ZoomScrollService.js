var ZoomScrollService = function(options){

  this.viewport = options.viewport;
  this.content = options.content;
  this.onZoomChanged = options.onZoomChanged || function(){};

  //viewport.css('overflow', 'hidden');
  //viewport.width(400).height(400);
  this.scrollController = this.viewport.mCustomScrollbar({
    axis: "xy"
  })[0];

  // scalars
  this.zoomValue = 1;
  this.originalContentSize = {
    w: this.content.width(),
    h: this.content.height()
  }

  this.setZoom = function(newValue){
    var oldValue = this.zoomValue;
    this.zoomValue = newValue;

    var newWidth = this.originalContentSize.w * newValue;
    var newHeight = this.originalContentSize.h * newValue;

    this.content
      .width(newWidth)
      .height(newHeight);

    var scrollLeft = this.scrollController.mcs.left;
    var scrollTop = this.scrollController.mcs.top;

    this.onZoomChanged(oldValue, newValue, {x: scrollLeft, y: scrollTop, w: newWidth, h: newHeight})
  };

}
