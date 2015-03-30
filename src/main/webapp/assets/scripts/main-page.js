/**
 * Created by wbzhao on 15-3-27.
 */
var mainPage = {

    user: undefined,
    tasks: undefined,
    isNewUser: false,

    initialize: function() {
        var i;
        Array.prototype.contains = function(item) {
            var i;
            for (i = 0; i < this.length; i++) {
                if (this[i] === item)
                    return true;
            }
            return false;
        };
        mainPage.getPageInfo();
        guideline.initialize(mainPage.isNewUser);
        mainPage.initUserInfoSect();
        mainPage.initTaskMapsSect();
    },

    getPageInfo: function() {
        $.ajax({
            url: "main-page/init-info",
            type: "GET",
            async: false,
            dataType: "json",
            success: function(response) {
                if (response.errorRedirect != null) {
                    window.location.href = response.errorRedirect;
                } else {
                    mainPage.user = response.user;
                    mainPage.tasks = response.tasks;
                    mainPage.isNewUser = response.isNewUser;
                    mainPage.tasks.findTaskById = function(taskId) {
                        var i;
                        for (i = 0; i < this.length; i++) {
                            if (this[i].id == taskId) {
                                return this[i];
                            }
                        }
                        return null;
                    };
                }
            }
        });
    },

    initUserInfoSect: function() {
        $("#user-name").text(mainPage.user.email.split("@")[0]);
        for (i = 0; i < mainPage.user.achievement.length; i++) {
            $("#info-profile ul").append("<li>" + mainPage.user.achievement[i] + "</li>");
        }
        mainPage.updateInProgressTable();
    },

    updateInProgressTable: function() {
        var taskId;
        var task;
        if (mainPage.user.inProcess != null) {
            $("#in-doing-tasks").find(".in_doing_table_row").remove();
            for (i = 0; i < mainPage.user.inProcess.length; i++) {
                taskId = mainPage.user.inProcess[i];
                task = mainPage.tasks.findTaskById(taskId);
                if (task != undefined) {
                    $("#in-doing-tasks").find("#tr-placeholder").before(
                        "<tr class='in_doing_table_row' type='" + task.type + "'>" +
                        "<td>" + task.name + "</td>" +
                        "<td>" + task.guard + "</td>" +
                        "<td>" + task.duration + "</td>" +
                        "</tr>"
                    );
                }
            }
        }
    },

    initTaskMapsSect: function() {
        var taskType;
        var taskId;
        var task;
        var makeTaskCard = function(task, type) {
            var taskCardHtml = "";
            var taskStatus;
            var getTaskStatus = function(task) {
                var Status;
                if (mainPage.user.inProcess != null && mainPage.user.inProcess.contains(task.id)) {
                    Status = "ACCEPTED";
                } else if (mainPage.user.finished != null && mainPage.user.finished.contains(task.id)) {
                    Status = "FINISHED";
                } else {
                    Status = "NOT_ACCEPTED";
                }
                return Status;
            };
            taskStatus = getTaskStatus(task);
            taskCardHtml += "<div id='" + task.id + "' value='" + taskStatus + "' class='task_card'>";
            taskCardHtml += "<div id='mark-" + type + "' class='mark_in_progress'>In Progress</div>";
            taskCardHtml += "<img src='/assets/images/" + type + "_card2.jpg' class='img_cardback'>";
            if (taskStatus == "ACCEPTED") {
                taskCardHtml += "<img src='/assets/images/" + type + ".jpg' class='img_cardface'>";
            } else if (taskStatus == "FINISHED") {
                taskCardHtml += "<img src='/assets/images/" + type + "_thumb.jpg' class='img_cardface'>";
            } else {
                taskCardHtml += "<img src='/assets/images/" + type + ".jpg' class='img_cardface'>";
            }
            taskCardHtml += "</div>";
            return taskCardHtml;
        };
        for (i = 0; i < mainPage.tasks.length; i++) {
            task = mainPage.tasks[i];
            taskId = task.id;
            taskType = task.type;
            switch(mainPage.tasks[i].type) {
                case "client":
                    $("#sect-client-taskmap").append(makeTaskCard(mainPage.tasks[i], "client"));
                    break;
                case "tech":
                    $("#sect-tech-taskmap").append(makeTaskCard(mainPage.tasks[i], "tech"));
                    break;
                case "process":
                    $("#sect-process-taskmap").append(makeTaskCard(mainPage.tasks[i], "process"));
                    break;
                case "comm":
                    $("#sect-comm-taskmap").append(makeTaskCard(mainPage.tasks[i], "comm"));
                    break;
                default : break;
            }
        }
        taskMaps.initialize();
    }

};

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

};

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

};

var guideline = {

    initialize: function(isNewUser){
        if (isNewUser == true) {
            $("#hello-user").text("Hello " + mainPage.user.email.split("@")[0] + "!");
            guideline.show();
        } else {
            $("#sect-new-user-guide").css({scale: 0, opacity: 0});
            $("#guideline-bg").css({opacity: 0, 'z-index': -1});
        }
    },

    show: function() {
        $("#guideline-bg").css({opacity: 0, 'z-index': -1}).transition({opacity: 0.4, 'z-index': 3000}, 1000);
        $("#sect-new-user-guide").css({scale: 0, opacity: 0}).transition({scale: 1.2, opacity: 1}, 400).transition({scale: 1}, 600);
        $("#guideline-btn-skip").bind("click", function(e){
            e.preventDefault();
            guideline.hide();
        });
        for(var i = 0; i < 10; i++) {
            $("#guideline-btn-skip").transition({'box-shadow': '#664422 0 0 30px', '-webkit-box-shadow': '#664422 0 0 30px', '-moz-box-shadow': '#664422 0 0 30px'},'800');
            $("#guideline-btn-skip").transition({'box-shadow': '#664422 0 0 5px', '-webkit-box-shadow': '#664422 0 0 5px', '-moz-box-shadow': '#664422 0 0 5px'},'800');
        }
    },

    hide: function() {
        $("#sect-new-user-guide").transition({scale: 0, opacity: 0}, 1000);
        $("#guideline-bg").transition({opacity: 0, 'z-index': -1}, 1000);
    }
};
