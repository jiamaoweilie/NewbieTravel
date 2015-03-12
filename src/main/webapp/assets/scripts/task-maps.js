var taskMaps = {

	initialize: function() {
        var i;
        var finishMarkByType;
        var taskImgs = $("#sect-task-maps img");

        for (i = 0; i < taskImgs.length; i++) {
            if ($(taskImgs[i]).attr("value") === 'ACCEPTED') {
                $(taskImgs[i]).attr("class", "img_clicked");
                $(taskImgs[i]).css("opacity", 0.4);
                $(taskImgs[i]).parent().css("background-color", "#333");
                $(taskImgs[i]).siblings(".mark_in_progress").show();
            }
            if ($(taskImgs[i]).attr("value") === 'FINISHED') {
                finishMarkByType = $(taskImgs[i]).siblings(".mark_in_progress").attr("id");
                finishMarkByType = finishMarkByType.slice(5, finishMarkByType.length);
                $(taskImgs[i]).parent().append("<div class='checkmark' id='checkmark-" + finishMarkByType + "'><span class='icon-checkmark'></span></div>");
            }
        }
		$("#sect-task-maps img").bind("click", function(e){
			var that = this;

	        e.preventDefault();
	        lightbox.openLightbox(that);
	    });
	}

}