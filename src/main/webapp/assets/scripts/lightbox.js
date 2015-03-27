var lightbox = {

    lbSect: $("#sect-light-box"),
    lbBg: $("#light-box-bg"),
    lbTaskId: $(".lb_task_id"),
    lbTaskHeader: $("#lb-task-header"),
    lbTaskContent: $("#lb-task-content"),
    lbTaskGuard: $("#lb-task-guard"),
    yButton: $("#btn-lightbox-accept"),
    nButton: $("#btn-lightbox-back"),

    openLightbox: function(taskCard) {
        if ($(taskCard).attr("value") === 'NOT_ACCEPTED') {
            $(taskCard).transition({perspective: 600, rotateY: '+=180deg', 'background-color': '#333'}, '1000');
            $(taskCard).children(".img_cardback").transition({'z-index': 101, opacity: 0}, '1000');
            $(taskCard).children(".img_cardface").transition({'z-index': 110, opacity: 0.4}, '1000');
        }
        lightbox.buildLightbox(taskCard);
        lightbox.bindAcceptButton(taskCard);
        lightbox.bindBackButton(taskCard);
    },

    buildLightbox: function(taskCard) {
        var taskId;
        var taskStatus;
        var strHtmlTaskType;
        var strHtmlTaskTitle;
        var task;
        var acceptedTasksCount;

        taskId = $(taskCard).attr("id");
        taskStatus = $(taskCard).attr("value");
        task = mainPage.tasks.findTaskById(taskId);
        acceptedTasksCount = mainPage.user.inProcess == null ? 0 : mainPage.user.inProcess.length;

        $(lightbox.nButton.selector).show();
        if ( 'ACCEPTED' === taskStatus || acceptedTasksCount >= 3 || 'FINISHED' === taskStatus) {
            $(lightbox.yButton.selector).hide();
        } else {
            $(lightbox.yButton.selector).show();
        }
        $(lightbox.lbTaskId.selector).attr("id", taskId);
        strHtmlTaskType = "<span id='lb-task-type'>" + task.type + ": </span>";
        strHtmlTaskTitle = "<span id='lb-task-name'>" + task.name + "</span>";
        $(lightbox.lbTaskHeader.selector).html( strHtmlTaskType + strHtmlTaskTitle);
        $(lightbox.lbTaskContent.selector).html(
            "<p>" + task.context + "</p><br/>" +
            "<p><b style='font-weight: 900; font-family: open-sans'>Duration: </b>" + task.duration + "day(s)</p><br/>" +
            "<p><b style='font-weight: 900; font-family: open-sans'>Link: </b> <a href='www.thoughtworks.video.com' style='font-size: 20px'>www.thoughtworks.video.com</a></p>"
        );
        $(lightbox.lbTaskGuard.selector).html("<p><b style='font-weight: 900; font-size: xx-large; font-family: open-sans'>Guard: </b><br><center>"+ task.guard +"</center></p>");
        $(lightbox.lbSect.selector).css({scale: 0}).show().transit({scale: 1, opacity: 1}, 'slow');
        $(lightbox.lbBg.selector).fadeIn("slow");
    },

    bindAcceptButton: function(taskCard) {
        $(lightbox.yButton.selector).bind("click", taskCard, function(e){
            var taskId = $(taskCard).attr("id");
            var requestUrl = "/task/accepted/" + taskId;
            e.preventDefault();
            $.ajax({
                url: requestUrl,
                data: {userId: mainPage.user.id},
                dataType: "json",
                type: "POST",
                success: lightbox.completeAccept($(taskCard))
            });
            $(lightbox.yButton.selector).unbind();
            $(lightbox.nButton.selector).unbind();
        });
    },

    bindBackButton: function(taskCard) {
        $(lightbox.nButton.selector).bind("click", taskCard, function(e){
            e.preventDefault();
            if ($(taskCard).attr("value") === 'NOT_ACCEPTED') {
                $(taskCard).transition({perspective: 600, rotateY: '-=180deg', 'background-color': 'transparent'}, '1000');
                $(taskCard).children(".img_cardback").transition({'z-index': 110, opacity: 1}, '1000');
                $(taskCard).children(".img_cardface").transition({'z-index': 101, opacity: 0}, '1000');
            }
            $(lightbox.lbSect.selector).transit({scale: 0, opacity: 0}, "slow");
            $(lightbox.lbBg.selector).fadeOut("slow");
            $(lightbox.yButton.selector).unbind();
            $(lightbox.nButton.selector).unbind();
        });
    },

    completeAccept: function(taskCard) {
        return function(response) {
            mainPage.user = response.user;
            $(lightbox.lbSect.selector).transit({scale: 0, opacity: 0}, "slow");
            $(lightbox.lbBg.selector).fadeOut("slow");
            $(taskCard).children(".mark_in_progress").css({perspective: 600, rotateY: "-=180deg"}).show();
            mainPage.updateInProgressTable();
        }
    }

}