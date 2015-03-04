package com.thoughtworks.repositories;

import com.thoughtworks.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class UserRepository {

    @Autowired
    private MongoTemplate mongoTemplate;

    public void addUser(User user) {
        if (!mongoTemplate.collectionExists(User.class)) {
            mongoTemplate.createCollection(User.class);
        }
        mongoTemplate.insert(user);
    }

    public User findById(String id) {
        return mongoTemplate.findById(id, User.class);
    }

    public List<User> findByEmail(String email) {
        Query query = new Query();
        query.addCriteria(new Criteria("email").is(email));
        return mongoTemplate.find(query, User.class);
    }
}
