package com.thoughtworks.services;

import com.thoughtworks.entities.User;

import java.util.List;

public interface UserService {
    User findById(String id);

    User findByEmail(String email);

    List<User> findAll();

    void createUser(User user);

    void updateUser(User user);
}
