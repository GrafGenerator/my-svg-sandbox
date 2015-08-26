var ZoomScrollService = function(options){

  this.viewport = options.viewport;
  this.content = options.content;
  this.svg = options.svg;
  this.onZoomChanged = options.onZoomChanged || function(){};
  this.onScrollChanged = options.onScrollChanged || function(){};

  // TODO: viewport size updating
  this.viewportSize = { w: this.viewport.width(), h: this.viewport.height()}
  this.viewPoint = { x: 0.5, y: 0.5 };
  this.viewPointTolerance = 100; // 1 divided by eps, i.e. 1/0.01

  this.getBounds = function(zoomValue){
    var width = this.originalContentSize.w * zoomValue;
    var height = this.originalContentSize.h * zoomValue;
    var scrollLeft = -this.scrollController.mcs.left;
    var scrollTop = -this.scrollController.mcs.top;

    return {x: scrollLeft, y: scrollTop, w: width, h: height};
  };

  this.setScroll = function(){
    var bounds = this.getBounds(this.zoomValue);

    if(this.zoomValue >= 1){
      // TODO: properly move viewpoint
      // this.moveViewPoint(this.zoomValue, bounds);
    }

    this.updateSvg(this.zoomValue, bounds);
  };


  this.scrollController = this.viewport.mCustomScrollbar({
    axis: "xy",
    theme: '3d-thick-dark',
    scrollbarPosition: "outside",
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




  this.moveViewPoint = function(zoomValue, bounds){
    var nx = bounds.x / this.viewportSize.w * zoomValue;
    var ny = bounds.y / this.viewportSize.h * zoomValue;

    this.viewPoint = { x: nx, y: ny };
  };



  this.updateSvg = function(zoomValue, bounds){
    this.viewboxSvg(zoomValue, bounds);
    this.positionSvg(zoomValue, bounds);
  };

  this.positionSvg = function(zoomValue, bounds){
    var x = zoomValue < 1 ? 0 : bounds.x;
    var y = zoomValue < 1 ? 0 : bounds.y;

    this.svg.css('left', x + 'px').css('top', y + 'px');
  };

  this.viewboxSvg = function(zoomValue, bounds){
    var viewBox = "";
    var factor = 1 / zoomValue;

    var cx = this.viewportSize.w * this.viewPoint.x;
    var cy = this.viewportSize.h * this.viewPoint.y;

    var w = this.viewportSize.w * factor;
    var h = this.viewportSize.h * factor;

    var x = cx - w / 2;
    var y = cy - h / 2;

    viewBox = x + ' ' + y + ' ' + w + ' ' + h;

    var svgNative = this.svg[0];
    svgNative.setAttribute('viewBox', viewBox);
  };

  this.setZoom = function(newValue){
    var oldValue = this.zoomValue;
    this.zoomValue = newValue;

    var newBounds = this.getBounds(newValue);

    var contentWidth = newBounds.w;
    var contentHeight = newBounds.h;
    var viewportWidth = this.viewportSize.w;
    var viewportHeight = this.viewportSize.h;

    var resetCondition = contentWidth <= viewportWidth && contentHeight <= viewportHeight;

    if(resetCondition){
      this.viewPoint = { x: 0.5, y: 0.5 };
    }

    if(resetCondition){
      var factor = 1 / newValue;

      newBounds.x = -(this.viewportSize.w * factor / 2);
      newBounds.y = -(this.viewportSize.h * factor / 2);

      contentWidth = viewportWidth;
      contentHeight = viewportHeight;
    }
    else{
      var sx = contentWidth * this.viewPoint.x;
      var sy = contentHeight * this.viewPoint.y;

      // TODO: update scrollbars properly
      // this.viewport.mCustomScrollbar("scrollTo", [sx, sy], { callbacks: false });
    }





    this.content.width(contentWidth).height(contentHeight);
    this.updateSvg(newValue, newBounds);
  };

}
