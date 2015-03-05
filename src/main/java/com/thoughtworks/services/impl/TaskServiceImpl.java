package com.thoughtworks.services.impl;

import com.thoughtworks.entities.Task;
import com.thoughtworks.repositories.TaskRepository;
import com.thoughtworks.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService {
    @Autowired
    TaskRepository taskRepository;

    @Override
    public List<Task> findTask() {
        return taskRepository.findAll();
    }

    @Override
    public void addTask(Task task) {
        taskRepository.addTask(task);
    }

    @Override
    public Task findTaskById(String taskId) {
        return taskRepository.findTaskById(taskId);
    }
}
