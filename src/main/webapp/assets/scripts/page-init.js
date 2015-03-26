var mainPage = {

    user: undefined,
    tasks: undefined,
    isNewUser: false,

    initialize: function() {
        var i;
        var j;
        var taskType;
        var taskId;
        var task;
        var clientTasks = new Array();
        var techTasks = new Array();
        var processTasks = new Array();
        var commTasks = new Array();

        Array.prototype.contains = function(item) {
            var i;
            for (i = 0; i < this.length; i++) {
                if (this[i] === item)
                return true;
            }
            return false;
        };

        /* get user and tasks data from server */
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

        guideline.initialize(mainPage.isNewUser);

        /* init user info */
        $("#user-name").text(mainPage.user.email.split("@")[0]);

        for (i = 0; i < mainPage.user.achievement.length; i++) {
            $("#info-profile ul").append("<li>" + mainPage.user.achievement[i] + "</li>");
        }

        mainPage.updateInProgressTable();

        /* init tasks */
        var makeTaskCard = function(task, type) {
            var taskCardHtml = "";
            taskCardHtml += "<div id='" + task.id + "' value='" + task.name + "' class='task_card'>";
            taskCardHtml += "<div id='task-guard-" + task.id + "' value='" + task.guard + "'></div>";
            taskCardHtml += "<div id='task-duration-" + task.id + "' value='" + task.duration + "'></div>";
            taskCardHtml += "<div id='mark-" + type + "' class='mark_in_progress'>In Progress</div>";
            taskCardHtml += "<img src='/assets/images/" + type + "_card2.jpg' class='img_cardback'>";

            if (mainPage.user.inProcess != null && mainPage.user.inProcess.contains(task.id)) {
                taskCardHtml += "<img src='/assets/images/" + type + ".jpg' class='img_cardface' value='ACCEPTED'>";
            } else if (mainPage.user.finished != null && mainPage.user.finished.contains(task.id)) {
                taskCardHtml += "<img src='/assets/images/" + type + "_thumb.jpg' class='img_cardface' value='FINISHED'>";
            } else {
                taskCardHtml += "<img src='/assets/images/" + type + ".jpg' class='img_cardface' value='NOT_ACCEPTED'>";
            }

            taskCardHtml += "</div>";
            return taskCardHtml;
        };

        for (i = 0; i < mainPage.tasks.length; i++) {
            task = mainPage.tasks[i];
            taskId = task.id;
            taskType = task.type;
            switch(mainPage.tasks[i].type) {
                case "client": clientTasks[clientTasks.length] = mainPage.tasks[i];
                    $("#sect-client-taskmap").append(makeTaskCard(mainPage.tasks[i], "client"));
                    break;
                case "tech": techTasks[techTasks.length] = mainPage.tasks[i];
                    $("#sect-tech-taskmap").append(makeTaskCard(mainPage.tasks[i], "tech"));
                    break;
                case "process": processTasks[processTasks.length] = mainPage.tasks[i];
                    $("#sect-process-taskmap").append(makeTaskCard(mainPage.tasks[i], "process"));
                    break;
                case "comm": commTasks[commTasks.length] = mainPage.tasks[i];
                    $("#sect-comm-taskmap").append(makeTaskCard(mainPage.tasks[i], "comm"));
                    break;
                default : break;
            }
        }

        taskMaps.initialize();
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
    }


}