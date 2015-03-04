package com.thoughtworks.services;

import com.thoughtworks.entities.User;

public interface UserService {
    public void login(String id);
    User findById(String id);

    User findByEmail(String email);
}
