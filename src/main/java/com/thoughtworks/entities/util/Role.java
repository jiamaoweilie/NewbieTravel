package com.thoughtworks.entities.util;

/**
 * Created by wbzhao on 3/9/15.
 */
public enum Role {
    BA(Constant.BA), QA(Constant.QA), DEV(Constant.DEV);

    private String rName;

    private Role(String role) {
        this.rName = role;
    }

    public String getName() {
        return this.rName;
    }
}
