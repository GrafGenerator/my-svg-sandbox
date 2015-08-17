var ZoomViewModel = function(viewportSelector, contentSelector, sliderSelector){
	this.viewport = $(viewportSelector);
	this.content = $(contentSelector);
	this.sliderElement = $(sliderSelector);
	this.svg = $(contentSelector + ' svg');
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
			this.updateSvgViewport(newValue, bounds);
		}.bind(this)
	});

	this.updateSvgViewport = function(zoomValue, bounds){
		var factor = 1 / zoomValue;

		var x = bounds.x * factor;
		var y = bounds.y * factor;
		var w = this.viewportSize.w * factor;
		var h = this.viewportSize.h * factor;

		var svgNative = this.svg[0];
		svgNative.setAttribute('viewBox', x + ' ' + y + ' ' + w + ' ' + h);
	}.bind(this);




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
