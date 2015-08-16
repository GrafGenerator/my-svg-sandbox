var DirtyViewModel = function(paneSelector, contentSelector, scrollbarSelector){
	var scrollPane = $(paneSelector);
	var scrollContent = $(contentSelector);
	var scrollbarElement = $(scrollbarSelector);
	
	this.contentSize = ko.observable(0);
	this.viewboxSize = ko.observable(0);
	this.displayedValue = ko.observable(0);
	
	this.updateContentSize = function(){
		this.contentSize(scrollContent.width());
	}.bind(this);
	
	this.updateViewboxSize = function(){
		this.viewboxSize(scrollPane.width());
	}.bind(this);
	
	scrollPane.resize(this.updateViewboxSize);
	scrollContent.resize(this.updateContentSize);
	
	this.scrollbar = new SliderControl(scrollbarElement, {
		contentSize: this.contentSize,
		viewboxSize: this.viewboxSize,
		onSlide: function(offset) {
			this.displayedValue(offset);
		}.bind(this)
	});
	
	this.updateContentSize();
	this.updateViewboxSize();
	
	return this;
}

