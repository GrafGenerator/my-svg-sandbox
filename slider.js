var SliderControl = function(element, inputOptions) {
	var options = $.extend({
		contentSize: function(){return 0;},
		viewboxSize: function(){return 0;},
		onSlide: function(offset) { }
	}, inputOptions);
	
	this.scrollbarElement = element;
	this.contentSize = options.contentSize();
	this.viewboxSize = options.viewboxSize();
	this.slideCallback = options.onSlide;
	this.offset = 0;
	
	if(options.contentSize && options.contentSize.subscribe){
		options.contentSize.subscribe(function(newValue){
			this.contentSize = newValue;
			
			// TODO: need another tuning here?
			this.sizeScrollbar();
		}.bind(this));
	}
	
	if(options.viewboxSize && options.viewboxSize.subscribe){
		options.viewboxSize.subscribe(function(newValue){
			this.viewboxSize = newValue;
			
			// TODO: what really needed here?
			this.resetValue();
			this.sizeScrollbar();
			this.reflowContent();
		}.bind(this));
	}
		

    //build slider
    this.scrollbar = this.scrollbarElement.slider({
      slide: function(event, ui) {
        var offset = 0;
		
		if (this.contentSize > this.viewboxSize) {
			offset = ui.value / 100 * (this.contentSize - this.viewboxSize);
        }
		
		this.offset = offset;
		this.slideCallback(offset);
      }.bind(this)
    });
 
    //append icon to handle
    this.handleHelper = this.scrollbar.find(".ui-slider-handle")
		.mousedown(function() {
		  this.scrollbar.width(this.handleHelper.width());
		}.bind(this))
		.mouseup(function() {
		  this.scrollbar.width("100%");
		}.bind(this))
		.append("<span class='ui-icon ui-icon-grip-dotted-vertical'></span>")
		.wrap("<div class='ui-handle-helper-parent'></div>")
		.parent();
 
    //size scrollbar and handle proportionally to scroll distance
    this.sizeScrollbar = function() {
      var remainder = this.contentSize - this.viewboxSize;
      var proportion = remainder / this.contentSize;
      var handleSize = this.viewboxSize - (proportion * this.viewboxSize);
	  
      this.scrollbar.find(".ui-slider-handle").css({
        width: handleSize,
        "margin-left": -handleSize / 2
      });
	  
      this.handleHelper.width("").width(this.scrollbar.width() - handleSize);
    }
 
    //reset slider value based on scroll content position
    this.resetValue = function() {
      var remainder = this.viewboxSize - this.contentSize;
      var percentage = Math.round( this.offset / remainder * 100 );
      this.scrollbar.slider("value", percentage);
    }
 
    //if the slider is 100% and window gets larger, reveal content
    this.reflowContent = function() {
        var showing = this.contentSize + this.offset;
        var gap = this.viewboxSize - showing;
        if (gap > 0) {
			this.offset = this.offset + gap;
			this.slideCallback(this.offset);
        }
    }
 
    //change handle position on window resize
    $(this.scrollbar).resize(function() {
      this.resetValue();
      this.sizeScrollbar();
      this.reflowContent();
    }.bind(this));
	
    //init scrollbar size
    setTimeout(this.sizeScrollbar.bind(this), 10 ); // safari wants a timeout
	
	return this;
  }