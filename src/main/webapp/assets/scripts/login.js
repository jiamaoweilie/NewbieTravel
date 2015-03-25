/**
 * Created by wbzhao on 15-3-24.
 */
var login = {

    initialize: function() {

        $("#btn-login-1").bind("click", function(e){
            var emailStr = $("#email-1").val();
            e.preventDefault();
            $.ajax({
                url: "login",
                data: {email: emailStr},
                type: "POST",
                async: false,
                dataType: "json",
                success: function(response) {
                    if (response.error != null) {
                        $("#login-error-msg-1").html(response.error);
                    } else if (response.isNewUser == true) {
                        $("#email-2").attr("value",response.email);
                        $(".login-page").transition({y: '-100%'});
                    } else if (response.goto != null) {
                        //$.ajax({
                        //    url: response.goto,
                        //    data: {userId: response.userId},
                        //    type: "GET",
                        //    success: function(response){
                        //        document.write(response);
                        //    }
                        //});
                        window.location.href = response.goto;
                    }
                }
            });
        });

        $("#btn-login-2").bind("click", function(e){
            var emailStr = $("#email-2").val();
            e.preventDefault();
            $.ajax({
                url: "login/new",
                data: {email: emailStr, team: $("#team-select option:selected").val(), role: $("input[name='role']:checked").val()},
                type: "POST",
                async: false,
                dataType: "json",
                success: function(response) {
                    if (response.error != null) {
                        $("#login-error-msg-2").html(response.error);
                    } else if (response.goto != null) {
                        //$.ajax({
                        //    url: response.goto,
                        //    data: {userId: response.userId},
                        //    type: "GET",
                        //    success: function(response){
                        //        document.write(response);
                        //    }
                        //});
                        window.location.href = response.goto;
                    }
                }
            });
        });
    }
}
