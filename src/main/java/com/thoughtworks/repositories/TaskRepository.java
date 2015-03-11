package com.thoughtworks.repositories;

import com.thoughtworks.entities.Task;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

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

    public List<Task> findAll() {
        return mongoTemplate.findAll(Task.class);
    }
}
