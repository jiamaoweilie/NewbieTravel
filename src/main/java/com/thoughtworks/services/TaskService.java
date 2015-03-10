package com.thoughtworks.services;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;

import java.util.List;

public interface TaskService {
    List<Task> findTask(User user);

    void addTask(Task task);

    Task findTaskById(String taskId);
}
