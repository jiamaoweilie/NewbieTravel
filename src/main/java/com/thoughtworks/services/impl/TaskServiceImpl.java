package com.thoughtworks.services.impl;

import com.thoughtworks.controllers.forms.UserTaskForm;
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
    public void addTask(Task task) {
        taskRepository.addTask(task);
    }

    @Override
    public Task findTaskById(String taskId) {
        return taskRepository.findTaskById(taskId);
    }

    @Override
    public List<UserTaskForm> getProcessTask(List<Task> tasks, User user) {
        List<UserTaskForm> processTasks = getUserTaskForms(tasks, user, "process");
        return processTasks;
    }

    private List<UserTaskForm> getUserTaskForms(List<Task> tasks, User user, String type) {
        List<UserTaskForm> processTasks = new ArrayList<UserTaskForm>();
        for (Task task : tasks) {
            if (type.equals(task.getType()))
                processTasks.add(new UserTaskForm(task, ""));
        }
        if (user.getInProcess() != null) {
            for (UserTaskForm taskForm : processTasks) {
                if (user.getInProcess().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("inProcess");
                }
            }
        }

        if (user.getFinished() != null) {
            for (UserTaskForm taskForm : processTasks) {
                if (user.getFinished().contains(taskForm.getTask().getId())) {
                    taskForm.setStatus("finished");
                }
            }
        }
        return processTasks;
    }

    @Override
    public List<UserTaskForm> getClientTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "client");
        return techTasks;
    }

    @Override
    public List<UserTaskForm> getTechTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "tech");
        return techTasks;
    }

    @Override
    public List<UserTaskForm> getCommTask(List<Task> tasks, User user) {
        List<UserTaskForm> techTasks = getUserTaskForms(tasks, user, "comm");
        return techTasks;
    }
}
