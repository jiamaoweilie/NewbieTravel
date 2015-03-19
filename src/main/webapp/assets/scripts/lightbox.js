var lightbox = {

    completeAccept: function(taskCard) {
        var i;
        var accepted_tasks = $(".accepted_task");
        var imgUrl = $(taskCard).children("img[class='img_cardface']").attr("src");

        $("#sect-light-box").transit({scale: 0, opacity: 0}, "slow");
        $("#light-box-bg").fadeOut("slow");

        $(taskCard).children(".mark_in_progress").css({perspective: 600, rotateY: "-=180deg"}).show();

        for (i = 0; i < 3; i++) {
            if (i === accepted_tasks.length) {
                $("#info-tasks-accepted").append('<div class="accepted_task"><img src="'+ imgUrl +'" alt="" class="img_task_accepted"/></div>');
                countTasksAccepted = '' + (i + 1);
                $("#info-tasks-accepted").attr("value", ""+ (i + 1) );
                $(taskCard).children("img[class='img_cardface']").attr("value", "ACCEPTED");
                break;
            };
        }
    },

    buildLightbox: function(taskMapImg) {
        var taskId = $(taskMapImg).parent().attr("id");
        var taskName = $(taskMapImg).parent().attr("value");
        var taskGuard = $(taskMapImg).siblings("#task-guard-" + taskId).attr("value");
        var taskContent = $(taskMapImg).siblings("#task-content-" + taskId).attr("value");
        var taskDuration = $(taskMapImg).siblings("#task-duration-" + taskId).attr("value");
        var strHtmlTaskType;
        var strHtmlTaskTitle;

        $(".lb_task_id").attr("id", taskId);

        strHtmlTaskType = "<span id='lb-task-type'>" + $(taskMapImg).parent().parent().children(".task_map_header").children(".task_map_title").text() + ": </span>";
        strHtmlTaskTitle = "<span id='lb-task-name'>" + taskName + "</span>";
        $("#lb-task-header").html( strHtmlTaskType + strHtmlTaskTitle);
        $("#lb-task-content").html( "<p>" + taskContent + "</p><br/><p><b style='font-weight: 900; font-family: open-sans'>Duration: </b>" + taskDuration +
            "day(s)</p><br/><p><b style='font-weight: 900; font-family: open-sans'>Link: </b> <a href='www.thoughtworks.video.com' style='font-size: 20px'>www.thoughtworks.video.com</a></p>");
        $("#lb-task-guard").html("<p><b style='font-weight: 900; font-size: xx-large; font-family: open-sans'>Guard: </b><br><center>"+ taskGuard +"</center></p>");

        $("#sect-light-box").css({scale: 0});
        $("#sect-light-box").show();
        $("#sect-light-box").transit({scale: 1, opacity: 1}, 'slow');
        $("#light-box-bg").fadeIn("slow");
    },

	openLightbox: function(taskMapImg) {
		var yButton = $("#btn-lightbox-accept");
		var nButton = $("#btn-lightbox-back");
		var countTasksAccepted = $("#info-tasks-accepted").children(".accepted_task").length;
		var isAccepted = $(taskMapImg).attr("value");
        var animStep = 10;
        var ms = 100;
        var i;

        if ($(taskMapImg).attr("class") === 'img_cardback') {
            $(taskMapImg).parent().transition({perspective: 600, rotateY: '+=180deg', 'background-color': '#333'}, '1000');
            $(taskMapImg).transition({'z-index': 101, opacity: 0}, '1000');
            $(taskMapImg).siblings(".img_cardface").transition({'z-index': 110, opacity: 0.4}, '1000');
        };

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
            $("#btn-lightbox-back").unbind();
	    });

	    nButton.bind("click", taskMapImg, function(image){
            var taskCard = $(image.data).parent();
            var imgUrl = $(image.data).attr("src");
	        image.preventDefault();
            if ($(image.data).attr("class") === 'img_cardback') {
                $(taskCard).transition({perspective: 600, rotateY: '-=180deg', 'background-color': 'transparent'}, '1000');
                $(image.data).transition({'z-index': 110, opacity: 1}, '1000');
                $(taskCard).children(".img_cardface").transition({'z-index': 101, opacity: 0}, '1000');
            }

	        $("#sect-light-box").transit({scale: 0, opacity: 0}, "slow");
            //$("#sect-light-box").hide();
	        $("#light-box-bg").fadeOut("slow");
	        $("#btn-lightbox-accept").unbind();
	        $(this).unbind();
	    });
	}

}