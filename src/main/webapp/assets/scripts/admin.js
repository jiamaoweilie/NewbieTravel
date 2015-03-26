/**
 * Created by wbzhao on 15-3-16.
 */
var admin;
admin = {

    users: undefined,
    tasks: undefined,

    initialise: function () {
        var i;
        admin.updateTaskList();
        admin.updateUserList();
        for (i = 0; i < $("input[class='btn_finish_task']").length; i++) {
            admin.bindFinishBtn($("input[class='btn_finish_task']")[i]);
        }
        for (i = 0; i < $("input[class='btn_rollback_task']").length; i++) {
            admin.bindRollbackBtn($("input[class='btn_rollback_task']")[i]);
        }

    },

    updateTaskList: function () {
        $.ajax({
            url: "/admin/tasks",
            type: "GET",
            async: false,
            success: function (response) {
                var i;
                var task;
                admin.tasks = response.tasks;
                for (i = 0; i < admin.tasks.length; i++) {
                    task = admin.tasks[i];
                    $("#task-list-table-head").after(
                        "<tr class='task_table_row'>" +
                        "<td>" + task.name + "</td>" +
                        "<td>" + task.type + "</td>" +
                        "<td>" + task.guard + "</td>" +
                        "<td>" + task.level + "</td>" +
                        "<td>" + task.duration + "</td>" +
                        "<td>" + task.availableForTeam + "</td>" +
                        "<td>" + task.availableForRole + "</td>" +
                        "<td>" + task.context + "</td>" +
                        "</tr>"
                    );
                }
            }
        });
    },

    updateUserList: function () {
        $.ajax({
            url: "/admin/users",
            type: "GET",
            async: false,
            success: function (response) {
                var i;
                var user;
                var findTaskById;
                findTaskById = function (taskId) {
                    var i;
                    for (i = 0; i < admin.tasks.length; i++) {
                        if (taskId == admin.tasks[i].id) {
                            return admin.tasks[i];
                        }
                    }
                    return null;
                };
                var composeUserInProgressList = function () {
                    var inProgressHtmlStr = "";
                    var inProgressTask;
                    var i;
                    if (user.inProcess != null) {
                        for (i = 0; i < user.inProcess.length; i++) {
                            inProgressTask = findTaskById(user.inProcess[i]);
                            inProgressHtmlStr += "<div class='in_doing_task' id='" + inProgressTask.id + "'>";
                            inProgressHtmlStr += inProgressTask.name;
                            inProgressHtmlStr += "<input type='button' value='Finish' class='btn_finish_task'><br/></div>";
                        }
                    }
                    return inProgressHtmlStr;
                };
                var composeUserFinishedList = function () {
                    var finishedHtmlStr = "";
                    var finishedTask;
                    var i;
                    if (user.finished != null) {
                        for (i = 0; i < user.finished.length; i++) {
                            finishedTask = findTaskById(user.finished[i]);
                            finishedHtmlStr += "<div class='finished_task' id='" + finishedTask.id + "'>";
                            finishedHtmlStr += finishedTask.name;
                            finishedHtmlStr += "<input type='button' value='Rollback' class='btn_rollback_task'><br/></div>";
                        }
                    }
                    return finishedHtmlStr;
                };

                admin.users = response.users;
                for (i = 0; i < admin.users.length; i++) {
                    user = admin.users[i];
                    $("#user-table-head").after(
                        "<tr class='user_table_row' id='" + user.id + "'>" +
                        "<td>" + user.email + "</td>" +
                        "<td>" + user.team + "</td>" +
                        "<td>" + user.role + "</td>" +
                        "<td>" + user.levelDetails.client + "</td>" +
                        "<td>" + user.levelDetails.tech + "</td>" +
                        "<td>" + user.levelDetails.process + "</td>" +
                        "<td>" + user.levelDetails.comm + "</td>" +
                        "<td class='in_progress_list'>" + /*user.inProcess*/composeUserInProgressList() + "</td>" +
                        "<td class='finished_list'>" + /*user.finished*/composeUserFinishedList() + "</td>" +
                        "</tr>"
                    );
                }
            }
        });
    },

    bindFinishBtn: function (btnFinish) {
        $(btnFinish).unbind();
        $(btnFinish).bind("click", function (e) {
            var urlString = '/task/finished/' + $(this).parent().attr("id");
            var userId = $(this).parents(".user_table_row").attr("id");
            e.preventDefault();
            $.ajax({
                url: urlString,
                type: "POST",
                data: {userId: userId},
                dataType: 'json',
                success: function (response) {
                    var taskSetFinish = response.task;
                    var user = response.user;
                    var errorMsg = response.error;
                    if (errorMsg != null) {
                        alert(errorMsg);
                        return;
                    }
                    var taskHtmlElem = $("tr[class='user_table_row'][id='" + user.id + "']").find(".in_doing_task[id='" + taskSetFinish.id + "']");
                    var taskParentElem = $(taskHtmlElem).parents(".in_progress_list").siblings(".finished_list");
                    var taskButton = $(taskHtmlElem).find("input[type='button']");
                    if (taskSetFinish != null) {
                        $(taskHtmlElem).remove()
                            .appendTo($(taskParentElem))
                            .attr("class", "finished_task")
                            .find("input[type='button']").attr("class", "btn_rollback_task").attr("value", "Rollback");
                        $(document).ready(admin.bindRollbackBtn(taskButton));

                    }
                }
            });
        });
    },

    bindRollbackBtn: function (btnRollback) {
        $(btnRollback).unbind();
        $(btnRollback).bind("click", function (e) {
            var urlString = '/task/rollback/' + $(this).parent().attr("id");
            var userId = $(this).parents(".user_table_row").attr("id");
            e.preventDefault();
            $.ajax({
                url: urlString,
                type: "POST",
                data: {userId: userId},
                dataType: 'json',
                success: function (response) {
                    var errorMsg = response.error;
                    if (errorMsg != null) {
                        alert(errorMsg);
                        return;
                    }
                    var taskSetRollback = response.task;
                    var user = response.user;
                    var taskHtmlElem = $("tr[class='user_table_row'][id='" + user.id + "']").find(".finished_task[id='" + taskSetRollback.id + "']");
                    var taskParentElem = $(taskHtmlElem).parents(".finished_list").siblings(".in_progress_list");
                    var taskButton = $(taskHtmlElem).find("input[type='button']");
                    if (taskSetRollback != null) {
                        $(taskHtmlElem).remove()
                            .appendTo($(taskParentElem))
                            .attr("class", "in_doing_task")
                            .find("input[type='button']").attr("class", "btn_finish_task").attr("value", "Finish");
                        $(document).ready(admin.bindFinishBtn(taskButton));
                    }
                }
            });
        });
    }
};
