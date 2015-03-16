/**
 * Created by wbzhao on 15-3-16.
 */
var admin = {

    initialise: function() {
        $(document).ready(function(){
            $("#btn-add-task").bind("click", function(e){
                e.preventDefault();
                var options = {
                    //target: "#add-task-form"
                    url: "admin/addtask",
                    type: "POST",
                    dataType: "json",
                    success: function(response) {
                        $.each(response.data.tasks, function(i, item) {
                            $("#add-task-form").append("<tr>" +
                                "<td>" + item.name + "</td>" +
                                "<td>" + item.type + "</td>" +
                                "<td>" + item.guard + "</td>" +
                                "<td>" + item.context + "</td></tr>"
                            );
                        });
                    }
                };

                //var refresh = function() {
                //    $.ajax({
                //        url: "admin",
                //        type: "GET"
                //    });
                //    return true;
                //};
                $("#add-task-form").ajaxSubmit(options);
                //$("#add-task-form").resetForm();
                //refresh();
                return false;
            });
        });
    }
}
