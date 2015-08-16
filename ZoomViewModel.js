var ZoomViewModel = function(viewportSelector, sliderSelector){
	var viewport = $(viewportSelector);
	var sliderElement = $(sliderSelector);

	var defaultValue = 1;
	this.sliderValue = ko.observable(defaultValue);

	this.slider = sliderElement.slider({
		min: 0.1, max: 10, step: 0.01,
		value: defaultValue,
		slide: function(event, ui) {
			this.sliderValue(ui.value);
		}.bind(this)
	});

	var fitViewport = function(){
		var parent = this.parent().parent();
		viewport
			.width(parent.width())
			.height(parent.height());
	}.bind(viewport);

	viewport.parent().parent().on('resize', fitViewport);
	fitViewport();

	var zoomService = new ZoomScrollService({viewport: viewport});

	return this;
}
