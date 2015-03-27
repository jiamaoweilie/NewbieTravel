var taskMaps = {

	initialize: function() {
        var i;
        var finishMarkByType;
        var taskCards = $("#sect-task-maps div[class='task_card']");

        for (i = 0; i < taskCards.length; i++) {
            switch ($(taskCards[i]).attr("value")) {
                case 'ACCEPTED':
                    taskMaps.setTaskCardShow(taskCards[i], ".img_cardface", ".img_cardback", 0.4);
                    $(taskCards[i]).css("background-color", "#333");
                    $(taskCards[i]).children(".mark_in_progress").show();
                    break;
                case 'FINISHED':
                    taskMaps.setTaskCardShow(taskCards[i], ".img_cardface", ".img_cardback", 1.0);
                    finishMarkByType = $(taskCards[i]).children(".mark_in_progress").attr("id").slice(5, this.length);
                    $(taskCards[i]).append(
                        "<div class='checkmark' id='checkmark-" + finishMarkByType + "'>" +
                            "<span class='icon-checkmark'></span>" +
                        "</div>");
                    break;
                case 'NOT_ACCEPTED':
                    taskMaps.setTaskCardShow(taskCards[i], ".img_cardback", ".img_cardface", 1.0);
                    break;
                default : break;
            }
            $(taskCards[i]).on("click", $("img"), function(e){
                var that = this;
                e.preventDefault();
                lightbox.openLightbox(that);
            });
        }
	},

    setTaskCardShow: function(taskCard, imgClassOnTop, imgClassAtBottom, imgOpacity) {
        $(taskCard).children(imgClassOnTop).css({'z-index': 110, opacity: imgOpacity});
        $(taskCard).children(imgClassAtBottom).css({'z-index': 101, opacity: 0, rotateY: '+=180deg'});
    }

}