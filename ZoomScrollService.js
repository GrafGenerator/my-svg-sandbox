var ZoomScrollService = function(options){

  this.viewport = options.viewport;
  this.content = options.content;

  //viewport.css('overflow', 'hidden');
  //viewport.width(400).height(400);
  this.viewport.mCustomScrollbar({
    axis: "xy"
  });

  // scalars
  this.zoomValue = 1;
  this.originalContentSize = {
    w: this.content.width(),
    h: this.content.height()
  }

  this.setZoom = function(newValue){
    this.zoomValue = newValue;

    var newWidth = this.originalContentSize.w * newValue;
    var newHeight = this.originalContentSize.h * newValue;

    this.content
      .width(newWidth)
      .height(newHeight);
  };

}
