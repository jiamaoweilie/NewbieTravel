package com.thoughtworks.entities.util;

/**
 * Created by wbzhao on 3/9/15.
 */
public enum Role {
    BA(Constant.BA), QA(Constant.QA), DEV(Constant.DEV), COMMON(Constant.RCOMMON);

    private String rRame;

    private Role(String role) {
        this.rRame = role;
    }

    public String getName() {
        return this.rRame;
    }
}
