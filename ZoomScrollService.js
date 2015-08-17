var ZoomScrollService = function(options){

  this.viewport = options.viewport;
  this.content = options.content;
  this.onZoomChanged = options.onZoomChanged || function(){};
  this.onScrollChanged = options.onScrollChanged || function(){};


  this.getBounds = function(zoomValue){
    var width = this.originalContentSize.w * zoomValue;
    var height = this.originalContentSize.h * zoomValue;
    var scrollLeft = -this.scrollController.mcs.left;
    var scrollTop = -this.scrollController.mcs.top;

    return {x: scrollLeft, y: scrollTop, w: width, h: height};
  };

  this.setScroll = function(){
    this.onScrollChanged(this.zoomValue, this.getBounds(this.zoomValue));
  };


  this.scrollController = this.viewport.mCustomScrollbar({
    axis: "xy",
    callbacks: {
      whileScrolling: this.setScroll.bind(this)
    }
  })[0];

  // scalars
  this.zoomValue = 1;
  this.originalContentSize = {
    w: this.content.width(),
    h: this.content.height()
  };

  this.setZoom = function(newValue){
    var oldValue = this.zoomValue;
    this.zoomValue = newValue;

    var newBounds = this.getBounds(newValue);
    this.content.width(newBounds.w).height(newBounds.h);

    this.onZoomChanged(oldValue, newValue, newBounds);
  };

}
