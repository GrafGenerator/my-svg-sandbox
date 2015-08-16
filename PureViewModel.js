var PureViewModel = function(scrollbarSelector){
	var scrollbarElement = $(scrollbarSelector);
	
	this.contentSize = ko.observable(1000);
	this.viewboxSize = ko.observable(50);
	this.scrollValue = ko.observable(0);
	
	this.increaseContentSize = function(){
		var value = this.contentSize();
		value += 100;
		this.contentSize(value);
	}.bind(this);
	
	this.decreaseContentSize = function(){
		var value = this.contentSize();
		value -= 100;
		if(value <= 0) value = 100;
		this.contentSize(value);
	}.bind(this);
	
	this.scrollbar = new SliderControl(scrollbarElement, {
		contentSize: this.contentSize,
		viewboxSize: this.viewboxSize,
		onSlide: function(offset) {
			this.scrollValue(offset);
		}.bind(this)
	});
	
	return this;
}

