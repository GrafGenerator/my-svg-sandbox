var ZoomViewModel = function(options){
	this.viewport = $(options.viewportSelector);
	this.content = $(options.contentSelector);
	this.svg = $(options.svgSelector);
	this.sliderElement = $(options.sliderSelector);
	this.viewportSize = { w: 0, h: 0 };

	this.content.css('overflow', 'hidden');

	var fitViewport = function(){
		var parent = this.viewport.parent();
		var parentWidth = parent.width();
		var parentHeight = parent.height();

		this.viewport.width(parentWidth).height(parentHeight);
		this.svg.attr('width', parentWidth).attr('height', parentHeight);

		this.viewportSize = { w: parentWidth, h: parentHeight };
	}.bind(this);

	this.viewport.parent().on('resize', fitViewport);
	fitViewport();

	this.zoomService = new ZoomScrollService({
		viewport: this.viewport,
		content: this.content,
		svg: this.svg
	});

	this.processZoom = function(newValue){
		this.zoomService.setZoom(newValue);
	}

	var defaultValue = 1;
	this.sliderValue = ko.observable(defaultValue);

	this.slider = this.sliderElement.slider({
		min: 0.1, max: 10, step: 0.01,
		value: defaultValue,
		slide: function(event, ui) {
			this.sliderValue(ui.value);
			this.processZoom(ui.value);
		}.bind(this)
	});


	return this;
}
