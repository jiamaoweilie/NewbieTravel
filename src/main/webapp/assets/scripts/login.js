var login = {

    initialise: function() {

       $("#btn-login").bind("click",login.userLogin(e));

    },

    userLogin: function(e) {
        e.preventDefault();
        $.ajax({
            url:"login",
            type:"POST",
            data: {email:$("#login-input-email").val()},
            success: function(response) {
                if (response.isNewUser == true) {
                    $("#login-input-email").attr("placeholder", response.email);
                    $(".form-login").append("<input id='login-input-team' type='text' name='team' /><br/>" +
                        "<input id='login-input-role' type='text' name='role'>");
                    $(".login").bind("click",login.newUserLogin(e));
                }
            }
        });
    },

    newUserLogin: function(e) {
        e.preventDefault();
        $.ajax({
            url: "login",
            data: {email:$("#login-input-email").val(),
                team: $("#login-input-team").val(),
                role: $("#login-input-role").val()
            },
            type: "POST"
        })
    }
}



