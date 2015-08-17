var ZoomViewModel = function(options){
	this.viewport = $(options.viewportSelector);
	this.content = $(options.contentSelector);
	this.svg = $(options.svgSelector);
	this.sliderElement = $(options.sliderSelector);
	this.viewportSize = { w: 0, h: 0 };

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
		onZoomChanged: function(oldValue,newValue, bounds){
			this.updateSvg(newValue, bounds);
		}.bind(this),
		onScrollChanged: function(zoomValue, bounds){
			this.updateSvg(zoomValue, bounds);
		}.bind(this)
	});

	this.updateSvg = function(zoomValue, bounds){
		this.positionSvg(zoomValue, bounds);
		this.viewboxSvg(zoomValue, bounds);


	}.bind(this);

	this.positionSvg = function(zoomValue, bounds){
		this.svg
			.css('left', bounds.x)
			.css('top', bounds.y);
	};

	this.viewboxSvg = function(zoomValue, bounds){
		var factor = 1 / zoomValue;

		var x = bounds.x * factor;
		var y = bounds.y * factor;
		var w = this.viewportSize.w * factor;
		var h = this.viewportSize.h * factor;

		var svgNative = this.svg[0];
		svgNative.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + h);
	};



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
