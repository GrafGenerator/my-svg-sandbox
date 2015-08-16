var MainViewModel = function(){
	this.viewModelDirty = new DirtyViewModel('#dirtyTest .scroll-pane', '#dirtyTest .scroll-content', '#dirtyTest .scroll-bar');
	this.viewModelPure = new PureViewModel('#pureTest .scroll-bar');
}

