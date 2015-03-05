package com.thoughtworks.services;

import com.thoughtworks.entities.User;

public interface UserService {
    User findById(String id);

    User findByEmail(String email);

    void createUser(User user);

    void updateUser(User user);
}
