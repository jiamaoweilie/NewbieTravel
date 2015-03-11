package com.thoughtworks.services.impl;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import com.thoughtworks.entities.constants.TaskType;
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
        return filterTasksByTeamAndRole(user, allTasks);
    }

    private List<Task> filterTasksByTeamAndRole(User user, List<Task> tasks) {
        List<Task> allTasksForUser = new ArrayList<Task>();
        for (Task task : tasks) {
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

    @Override
    public List<Task> findProcessTasks(User user) {
        List<Task> tasks = taskRepository.findTaskByTypeAndLevel(TaskType.PROCESS, user.getLevelDetails().get(TaskType.PROCESS));
        return filterTasksByTeamAndRole(user, tasks);
    }

    @Override
    public List<Task> findClientTasks(User user) {
        List<Task> tasks = taskRepository.findTaskByTypeAndLevel(TaskType.CLIENT, user.getLevelDetails().get(TaskType.CLIENT));
        return filterTasksByTeamAndRole(user, tasks);
    }

    @Override
    public List<Task> findTechTasks(User user) {
        List<Task> tasks = taskRepository.findTaskByTypeAndLevel(TaskType.TECH, user.getLevelDetails().get(TaskType.TECH));
        return filterTasksByTeamAndRole(user, tasks);
    }

    @Override
    public List<Task> findCommTasks(User user) {
        List<Task> tasks = taskRepository.findTaskByTypeAndLevel(TaskType.COMM, user.getLevelDetails().get(Constant.COMM));
        return filterTasksByTeamAndRole(user, tasks);
    }
}
