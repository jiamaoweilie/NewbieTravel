package com.thoughtworks.repositories;

import com.thoughtworks.entities.Task;
import com.thoughtworks.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class TaskRepository {
    @Autowired
    private MongoTemplate mongoTemplate;

    public void addTask(Task task) {
        mongoTemplate.save(task);
    }

    public Task findTaskById(String id) {
        return mongoTemplate.findById(id, Task.class);
    }

    public List<Task> findAll(User user) {
        List<Task> allTasks = mongoTemplate.findAll(Task.class);
        List<Task> allTasksForUser = new ArrayList<Task>();
        for (Task task : allTasks) {
            if (task.getAvailableForTeam() != null && task.getAvailableForRole() != null) {
                if (task.getAvailableForTeam().contains(user.getTeam()) && task.getAvailableForRole().contains(user.getRole())) {
                    allTasksForUser.add(task);
                }
            }
        }
        return allTasksForUser;
    }
}
