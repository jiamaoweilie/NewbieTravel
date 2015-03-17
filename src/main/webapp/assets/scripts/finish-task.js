/**
 * Created by wbzhao on 15-3-17.
 */
$(document).ready(function() {
    $("input[class='btn_finish_task']").bind("click", function(e){
        var urlString = '/task/finished/' + $(this).parent().attr("id");
        var userId = $(this).parents(".user_entry").attr("id");
        e.preventDefault();
        $.ajax({
            url: urlString,
            type: "POST",
            data: {userId: userId},
            dataType: 'json',
            success: function(response) {
                var taskSetFinish = response;
                var taskHtmlElem = $(".in_doing_task[id='" + taskSetFinish.id + "']");
                var taskParentElem = $(taskHtmlElem).parents(".in_progress_list").siblings(".finished_list");
                if (taskSetFinish != null) {
                    $(taskHtmlElem).remove()
                        .appendTo($(taskParentElem))
                        .children("input[type='button']").remove();
                }
            }
        });
    });
});