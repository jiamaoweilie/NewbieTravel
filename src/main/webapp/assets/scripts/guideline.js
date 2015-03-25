/**
 * Created by wbzhao on 15-3-16.
 */
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
}
