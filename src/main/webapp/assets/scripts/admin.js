/**
 * Created by wbzhao on 15-3-16.
 */
var admin = {

    initialise: function() {
        var i;
        for (i = 0; i < $("input[class='btn_finish_task']").length; i++) {
            admin.bindFinishBtn($("input[class='btn_finish_task']")[i]);
        }
        for (i = 0; i < $("input[class='btn_rollback_task']").length; i++) {
            admin.bindRollbackBtn($("input[class='btn_rollback_task']")[i]);
        }

    },

    bindFinishBtn: function(btnFinish) {
        $(btnFinish).unbind();
        $(btnFinish).bind("click", function(e){
            var urlString = '/task/finished/' + $(this).parent().attr("id");
            var userId = $(this).parents(".user_entry").attr("id");
            e.preventDefault();
            $.ajax({
                url: urlString,
                type: "POST",
                data: {userId: userId},
                dataType: 'json',
                success: function(response) {
                    var taskSetFinish = response.task;
                    var user = response.user;
                    var errorMsg = response.error;
                    if (errorMsg != null) {
                        alert(errorMsg);
                        return;
                    }
                    var taskHtmlElem = $("tr[class='user_entry'][id='" + user.id + "']").find(".in_doing_task[id='" + taskSetFinish.id + "']");
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

    bindRollbackBtn: function(btnRollback) {
        $(btnRollback).unbind();
        $(btnRollback).bind("click", function(e){
            var urlString = '/task/rollback/' + $(this).parent().attr("id");
            var userId = $(this).parents(".user_entry").attr("id");
            e.preventDefault();
            $.ajax({
                url: urlString,
                type: "POST",
                data: {userId: userId},
                dataType: 'json',
                success: function(response) {
                    var errorMsg = response.error;
                    if (errorMsg != null) {
                        alert(errorMsg);
                        return;
                    }
                    var taskSetRollback = response.task;
                    var user = response.user;
                    var taskHtmlElem = $("tr[class='user_entry'][id='" + user.id + "']").find(".finished_task[id='" + taskSetRollback.id + "']");
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
}
