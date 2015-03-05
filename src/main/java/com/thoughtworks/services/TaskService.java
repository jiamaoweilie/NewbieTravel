package com.thoughtworks.services;

import com.thoughtworks.controllers.forms.UserTaskForm;
import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;

import java.util.List;

public interface TaskService {
    List<Task> findTask();

    void addTask(Task task);

    Task findTaskById(String taskId);

    List<UserTaskForm> getProcessTask(List<Task> tasks, User user);

    List<UserTaskForm> getClientTask(List<Task> tasks, User user);

    List<UserTaskForm> getTechTask(List<Task> tasks, User user);

    List<UserTaskForm> getCommTask(List<Task> tasks, User user);
}
