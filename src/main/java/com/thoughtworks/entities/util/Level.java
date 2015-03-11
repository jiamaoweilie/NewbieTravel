package com.thoughtworks.entities.util;

public enum Level {
    GRAD(Constant.GRAD),
    JUNIOR(Constant.JUNIOR),
    SENIOR(Constant.SENIOR);
    String level;
    Level(String level) {
        this.level = level;
    }

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
