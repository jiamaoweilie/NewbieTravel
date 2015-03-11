package com.thoughtworks.services.impl;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.repositories.TaskRepository;
import com.thoughtworks.services.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    public List<Task> findTaskForUser(User user) {
        List<Task> allTasks = taskRepository.findAll();
        ArrayList<Task> allTasksForUser = new ArrayList<Task>();
        for (Task task: allTasks) {
            if (task.getAvailableForTeam().contains(user.getTeam()) && task.getAvailableForRole().contains(user.getRole()))
                allTasksForUser.add(task);
        }
        return allTasksForUser;
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
