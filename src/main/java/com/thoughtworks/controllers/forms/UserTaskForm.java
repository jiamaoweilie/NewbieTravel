package com.thoughtworks.controllers.forms;

import com.thoughtworks.entities.Task;

public class UserTaskForm {
    Task task;
    String status;

    public UserTaskForm(Task task, String status) {
        this.task = task;
        this.status = status;
    }

    public Task getTask() {
        return task;
    }

    public String getStatus() {
        return status;
    }

    public void setTask(Task task) {
        this.task = task;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
