package com.thoughtworks.entities.util;

/**
 * Created by wbzhao on 3/9/15.
 */
public enum Team {
    SWORDFISH(Constant.SWORDFISH), TERRACOTTA(Constant.TERRACOTTA), COMMON(Constant.TCOMMON);

    private String tName;

    private Team(String team) {
        this.tName = team;
    }

    public String getName() {
        return this.tName;
    }
}
