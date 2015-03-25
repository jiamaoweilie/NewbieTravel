//$(document).ready(function(){
//    taskMaps.initialize();
//
//});

var mainPage = {

    user: undefined,
    tasks: undefined,
    isNewUser: false,

    initialize: function() {

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
                }
            }
        });

        guideline.initialize(mainPage.isNewUser);

        $("#user-name").text(mainPage.user.email.split("@")[0]);

        for (i = 0; i < mainPage.user.achievement.length; i++) {
            $("#info-profile ul").append("<li>" + mainPage.user.achievement[i] + "</li>");
        }

    }




}