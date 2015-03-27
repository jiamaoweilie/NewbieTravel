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

}