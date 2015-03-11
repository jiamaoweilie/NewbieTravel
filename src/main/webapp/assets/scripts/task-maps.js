var taskMaps = {

	initialize: function() {
        var i;
        var taskImgs = $("#sect-task-maps img");

        for (i = 0; i < taskImgs.length; i++) {
            if ($(taskImgs[i]).attr("value") === 'ACCEPTED') {
                $(taskImgs[i]).attr("class", "img_clicked");
                $(taskImgs[i]).css("opacity", 0.4);
                $(taskImgs[i]).parent().css("background-color", "#333");
                $(taskImgs[i]).siblings(".mark_in_progress").show();
            }
        }
		$("#sect-task-maps img").bind("click", function(e){
			var that = this;

	        e.preventDefault();
	        lightbox.openLightbox(that);
	    });
	}

}