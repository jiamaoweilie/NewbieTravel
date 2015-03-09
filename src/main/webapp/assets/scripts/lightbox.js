var lightbox = {

    completeAccept: function(taskCard) {
        var i;
        var accepted_tasks = $(".accepted_task");
        var imgUrl = $(taskCard).children("img").attr("src");

        $("#sect-light-box").fadeOut("slow");
        $("#light-box-bg").fadeOut("slow");

        $(taskCard).children(".mark_in_progress").show();
        $(taskCard).children(".img_unclicked").css("opacity", 0.4);
        $(taskCard).css("background-color", "#333");
        imgUrl = imgUrl.slice(0, (imgUrl.length) - 6) + ".jpg";
        $(taskCard).children(".img_unclicked").attr("src", imgUrl);

        for (i = 0; i < 3; i++) {
            if (i === accepted_tasks.length) {
                $("#info-tasks-accepted").append('<div class="accepted_task"><img src="'+ imgUrl +'" alt="" class="img_task_accepted"/></div>');
                countTasksAccepted = '' + (i + 1);
                $("#info-tasks-accepted").attr("value", ""+ (i + 1) );
                $(taskCard).children("img").attr("value", "ACCEPTED");
                break;
            };
        }
    },

    buildLightbox: function(taskMapImg) {
        var taskId = $(taskMapImg).parent().attr("id");
        var taskName = $(taskMapImg).parent().attr("value");
        var taskGuard = $(taskMapImg).siblings("#task-guard-" + taskId).attr("value");
        var taskContent = $(taskMapImg).siblings("#task-content-" + taskId).attr("value");
        var strHtmlTaskType;
        var strHtmlTaskTitle;

        $(".lb_task_id").attr("id", taskId);

        strHtmlTaskType = "<span id='lb-task-type'>" + $(taskMapImg).parent().parent().children(".task_map_header").children(".task_map_title").text() + ": </span>";
        strHtmlTaskTitle = "<span id='lb-task-name'>" + taskName + "</span>";
        $("#lb-task-header").html( strHtmlTaskType + strHtmlTaskTitle);
        $("#lb-task-content").html("<p><b style='font-weight: 700; font-size: xx-large'>Task Description: </b><br/>" + taskContent + "</p>");
        $("#lb-task-guard").html("<p><b style='font-weight: 700; font-size: xx-large'>Guard: </b><br>"+ taskGuard +"</p>");

        $("#sect-light-box").fadeIn("slow");
        $("#light-box-bg").fadeIn("slow");
    },

	openLightbox: function(taskMapImg) {
		var yButton = $("#btn-lightbox-accept");
		var nButton = $("#btn-lightbox-back");
		var countTasksAccepted = $("#info-tasks-accepted").children(".accepted_task").length;
		var isAccepted = $(taskMapImg).attr("value");
        var getReqUrl = "/detail/" + $(taskMapImg).attr("id");

        lightbox.buildLightbox(taskMapImg);

        $(yButton).show();
        $(nButton).show();

        if ( 'ACCEPTED' === isAccepted || 3 === countTasksAccepted || 'FINISHED' === isAccepted) {
        	$(yButton).hide();
        };

        yButton.bind("click", taskMapImg, function(image){
            var taskId = $(image.data).parent().attr("id");
            var requestUrl = "/task/accepted/" + taskId;
	        image.preventDefault();

            $.post(requestUrl, lightbox.completeAccept($(image.data).parent()));

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