package com.thoughtworks.services;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;

import java.util.List;

public interface TaskService {
    List<Task> findTask();

    List<Task> findTaskForUser(User user);

    void addTask(Task task);

    Task findTaskById(String taskId);

    List<Task> findProcessTasks(User user);

    List<Task> findClientTasks(User user);

    List<Task> findTechTasks(User user);

    List<Task> findCommTasks(User user);
}
