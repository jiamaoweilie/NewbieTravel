/**
 * Created by wbzhao on 15/4/27.
 */

var Planet = function(domObj_taskGroup){
    this.domTaskGroup = domObj_taskGroup;
    this.unlock = function() {
        $(this.domTaskGroup).children(".lock").fadeOut();
    };
    this.lock = function() {
        $(this.domTaskGroup).children(".lock").fadeIn();
    };
    return this;
};

var planets;


