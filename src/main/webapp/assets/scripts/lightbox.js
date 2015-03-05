var lightbox = {

	openLightbox: function(taskMapImg) {
		var yButton = $("#btn-lightbox-accept");
		var nButton = $("#btn-lightbox-back");
		var countTasksAccepted = $("#info-tasks-accepted").attr("value");
		var isAccepted = $(taskMapImg).attr("value");

		$("#lb-task-type").html($(taskMapImg).parent().parent().children(".task_map_header").children(".task_map_title").text());

        $("#sect-light-box").fadeIn("slow");
        $("#light-box-bg").fadeIn("slow");
        $(yButton).show();
        $(nButton).show();

        if ( 'ACCEPTED' === isAccepted || '3' === countTasksAccepted) {
        	$(yButton).hide();
        };

        yButton.bind("click", taskMapImg, function(image){
        	var accepted_tasks = $(".accepted_task");
        	var i;
        	var imgUrl = $(image.data).attr("src");
	        image.preventDefault();
	        $("#sect-light-box").fadeOut("slow");
	        $("#light-box-bg").fadeOut("slow");

	        $(image.data).siblings(".mark_in_progress").show();
	        $(image.data).parent().css("background-color", "#333");
	        for (i = 0; i < accepted_tasks.length; i++) {
	        	if (0 === $(accepted_tasks[i]).children().length) {
	        		$(accepted_tasks[i]).append('<img src="'+ imgUrl +'" alt="" class="img_task_accepted"/>');
	        		countTasksAccepted = '' + (i + 1);
	        		$("#info-tasks-accepted").attr("value", "" + (i + 1));
	        		$(image.data).attr("value", "ACCEPTED");
	        		break;
	        	};
	        }
	        $(this).unbind();
	    });

	    nButton.bind("click", function(e){
	        e.preventDefault();
	        $("#sect-light-box").fadeOut("slow");
	        $("#light-box-bg").fadeOut("slow");
	        $("#btn-lightbox-accept").unbind();
	        $(this).unbind();
	    });
	}

}