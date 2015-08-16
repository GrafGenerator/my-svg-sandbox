var ZoomViewModel = function(viewportSelector, contentSelector, sliderSelector){
	var viewport = $(viewportSelector);
	var content = $(contentSelector);
	var sliderElement = $(sliderSelector);

	var fitViewport = function(){
		var parent = this.parent();
		viewport
			.width(parent.width())
			.height(parent.height());
	}.bind(viewport);

	viewport.parent().on('resize', fitViewport);
	fitViewport();

	this.zoomService = new ZoomScrollService({
		viewport: viewport,
		content: content
	});


	this.processZoom = function(newValue){
		this.zoomService.setZoom(newValue);
	}

	var defaultValue = 1;
	this.sliderValue = ko.observable(defaultValue);

	this.slider = sliderElement.slider({
		min: 0.1, max: 10, step: 0.01,
		value: defaultValue,
		slide: function(event, ui) {
			this.sliderValue(ui.value);
			this.processZoom(ui.value);
		}.bind(this)
	});





	return this;
}
