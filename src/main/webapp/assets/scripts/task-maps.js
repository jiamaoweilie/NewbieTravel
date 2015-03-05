var taskMaps = {

	initialize: function() {
		$("#sect-task-maps img").bind("click", function(e){
			var that = this;

	        e.preventDefault();
	        lightbox.openLightbox(that);
	    });
	}

}