var lightbox = {

    completeAccept: function(taskCard) {
        var i;
        var accepted_tasks = $(".accepted_task");
        var imgUrl = $(taskCard).children("img").attr("src");

        $("#sect-light-box").transit({scale: 0}, "slow");
        $("#sect-light-box").hide();
        $("#light-box-bg").fadeOut("slow");

        $(taskCard).children(".mark_in_progress").css({perspective: 100, rotateY: "-=180deg"});
        $(taskCard).children(".mark_in_progress").show();
        $(taskCard).children("img").attr("class", "img_clicked");
        $(taskCard).children("img").css("opacity", 0.4);
        $(taskCard).css("background-color", "#333");
        //imgUrl = imgUrl.slice(0, (imgUrl.length) - 10) + ".jpg";
        //$(taskCard).children("img").attr("src", imgUrl);

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
        $("#lb-task-content").html( taskContent +
            "</p><br/><p><b style='font-weight: 900; font-family: open-sans'>Link: </b> <a href='www.thoughtworks.video.com' style='font-size: 20px'>www.thoughtworks.video.com</a></p>");
        $("#lb-task-guard").html("<p><b style='font-weight: 900; font-size: xx-large; font-family: open-sans'>Guard: </b><br><center>"+ taskGuard +"</center></p>");

        $("#sect-light-box").css({scale: 0});
        $("#sect-light-box").show();
        $("#sect-light-box").transit({scale: 1}, 'slow');
        $("#light-box-bg").fadeIn("slow");
    },

	openLightbox: function(taskMapImg) {
		var yButton = $("#btn-lightbox-accept");
		var nButton = $("#btn-lightbox-back");
		var countTasksAccepted = $("#info-tasks-accepted").children(".accepted_task").length;
		var isAccepted = $(taskMapImg).attr("value");
        var getReqUrl = "/detail/" + $(taskMapImg).attr("id");
        var animStep = 10;
        var ms = 100;
        var i;

        if ($(taskMapImg).attr("value") === 'NOT_ACCEPTED') {
            $(taskMapImg).parent().transition({perspective:100, rotateY: '+=180deg'}, '1000', function() {
                var taskCard = this;
                var imgUrl = $(this).children("img").attr("src");

                imgUrl = imgUrl.slice(0, (imgUrl.length) - 10) + ".jpg";
                $(taskCard).children("img").css({perspective: 100, rotateY: '-=180deg'});
                $(taskCard).children("img").attr("src", imgUrl);
                $(taskCard).children("img").attr("class", "img_clicked");
                $(taskCard).children("img").css("opacity", 0.4);
                $(taskCard).css("background-color", "#333");
            });
        }


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

	    nButton.bind("click", taskMapImg, function(image){
            var taskCard = $(image.data).parent();
            var imgUrl = $(image.data).attr("src");
	        image.preventDefault();
            if ($(image.data).attr("value") === 'NOT_ACCEPTED') {
                $(taskCard).transit({perspective: 100, rotateY: '-=180deg'}, '1000', function(){

                });
                imgUrl = imgUrl.slice(0, (imgUrl.length) - 4) + "_card2.jpg";
                $(image.data).attr("src", imgUrl);
                $(image.data).css({perspective: 100, rotateY: '-=180deg'});
                $(image.data).attr("class", "img_unclicked");
                $(image.data).css("opacity", 1.0);
                $(taskCard).css("background-color", "transparent");
            }

	        $("#sect-light-box").transit({scale: 0}, "slow");
            $("#sect-light-box").hide();
	        $("#light-box-bg").fadeOut("slow");
	        $("#btn-lightbox-accept").unbind();
	        $(this).unbind();
	    });
	}

}