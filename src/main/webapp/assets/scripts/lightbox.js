var lightbox = {

    completeAccept: function(taskCard) {
        var i;
        var accepted_tasks = $(".in_doing_table_row");
        var taskId = $(taskCard).attr("id");
        var task = mainPage.tasks.findTaskById(taskId);

        return function(response) {
            mainPage.user = response.user;
            $("#sect-light-box").transit({scale: 0, opacity: 0}, "slow");
            $("#light-box-bg").fadeOut("slow");

            $(taskCard).children(".mark_in_progress").css({perspective: 600, rotateY: "-=180deg"}).show();

            mainPage.updateInProgressTable();

            for (i = 0; i < 3; i++) {
                if (i === accepted_tasks.length) {
                    countTasksAccepted = '' + (i + 1);
                    $("#info-tasks-accepted").attr("value", ""+ (i + 1) );
                    $(taskCard).children("img[class='img_cardface']").attr("value", "ACCEPTED");
                    break;
                }
            }
        }
    },

    buildLightbox: function($taskCard, $yButton, $nButton) {
        var taskId = $taskCard.attr("id");
        var taskStatus = $taskCard.attr("value");

        var strHtmlTaskType;
        var strHtmlTaskTitle;
        var task = mainPage.tasks.findTaskById(taskId);

        $yButton.show();
        $nButton.show();

        if ( 'ACCEPTED' === taskStatus || mainPage.user.inProcess.length >= 3 || 'FINISHED' === taskStatus) {
            $yButton.hide();
        }

        $(".lb_task_id").attr("id", taskId);

        strHtmlTaskType = "<span id='lb-task-type'>" + task.type + ": </span>";
        strHtmlTaskTitle = "<span id='lb-task-name'>" + task.name + "</span>";
        $("#lb-task-header").html( strHtmlTaskType + strHtmlTaskTitle);
        $("#lb-task-content").html( "<p>" + task.context + "</p><br/><p><b style='font-weight: 900; font-family: open-sans'>Duration: </b>" + task.duration +
            "day(s)</p><br/><p><b style='font-weight: 900; font-family: open-sans'>Link: </b> <a href='www.thoughtworks.video.com' style='font-size: 20px'>www.thoughtworks.video.com</a></p>");
        $("#lb-task-guard").html("<p><b style='font-weight: 900; font-size: xx-large; font-family: open-sans'>Guard: </b><br><center>"+ task.guard +"</center></p>");

        $("#sect-light-box").css({scale: 0});
        $("#sect-light-box").show();
        $("#sect-light-box").transit({scale: 1, opacity: 1}, 'slow');
        $("#light-box-bg").fadeIn("slow");
    },

	openLightbox: function($taskCard) {
		var $yButton = $("#btn-lightbox-accept");
		var $nButton = $("#btn-lightbox-back");
		var countTasksAccepted = mainPage.user.inProcess == null ? 0 : mainPage.user.inProcess.length;
		var isAccepted = $(taskMapImg).attr("value");

        if ($taskCard.attr("value") === 'NOT_ACCEPTED') {
            $taskCard.transition({perspective: 600, rotateY: '+=180deg', 'background-color': '#333'}, '1000');
            $taskCard.children(".img_cardback").transition({'z-index': 101, opacity: 0}, '1000');
            $taskCard.children(".img_cardface").transition({'z-index': 110, opacity: 0.4}, '1000');
        }

        lightbox.buildLightbox($taskCard, $yButton, $nButton);



        $yButton.bind("click", taskMapImg, function(image){
            var taskId = $(image.data).parent().attr("id");
            var requestUrl = "/task/accepted/" + taskId;
	        image.preventDefault();

            $.ajax({
                url: requestUrl,
                data: {userId: mainPage.user.id},
                dataType: "json",
                type: "POST",
                success: lightbox.completeAccept($(image.data).parent())
            });

	        $(this).unbind();
            $("#btn-lightbox-back").unbind();
	    });

	    $nButton.bind("click", taskMapImg, function(image){
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