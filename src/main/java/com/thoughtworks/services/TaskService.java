package com.thoughtworks.services;

import com.thoughtworks.entities.Task;

import java.util.List;

public interface TaskService {
    List<Task> findTask();

    void addTask(Task task);

    Task findTaskById(String taskId);
}
