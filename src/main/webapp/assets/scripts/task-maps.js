var taskMaps = {

	initialize: function() {
        var i;
        var finishMarkByType;
        var taskImgs = $("#sect-task-maps img[class='img_cardface']");

        for (i = 0; i < taskImgs.length; i++) {
            if ($(taskImgs[i]).attr("value") === 'ACCEPTED') {
                $(taskImgs[i]).css("opacity", 0.4).css("z-index", 110);
                $(taskImgs[i]).siblings(".img_cardback").css("z-index", 101).css({perspective: 600, rotateY: '+=180deg', opacity: 0});
                $(taskImgs[i]).parent().css("background-color", "#333");
                $(taskImgs[i]).siblings(".mark_in_progress").show();
            }
            if ($(taskImgs[i]).attr("value") === 'FINISHED') {
                $(taskImgs[i]).css("opacity", 1.0).css("z-index", 110);
                $(taskImgs[i]).siblings(".img_cardback").css("z-index", 101).css({perspective: 600, rotateY: '+=180deg', opacity: 0});
                finishMarkByType = $(taskImgs[i]).siblings(".mark_in_progress").attr("id");
                finishMarkByType = finishMarkByType.slice(5, finishMarkByType.length);
                $(taskImgs[i]).parent().append("<div class='checkmark' id='checkmark-" + finishMarkByType + "'><span class='icon-checkmark'></span></div>");
            }
            if ($(taskImgs[i]).attr("value") === "NOT_ACCEPTED") {
                $(taskImgs[i]).css("z-index", 101).css({perspective: 600, rotateY: '+=180deg', opacity: 0});
                $(taskImgs[i]).siblings(".img_cardback").css("z-index", 110).css("opacity", 1.0);
            }
        }
		$(".task_card").on("click", $("img"), function(e){
			var $that = this;
	        e.preventDefault();
	        lightbox.openLightbox($that);
	    });
	}

}