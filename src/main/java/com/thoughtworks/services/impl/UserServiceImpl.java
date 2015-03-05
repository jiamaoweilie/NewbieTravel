package com.thoughtworks.services.impl;

import com.thoughtworks.entities.User;
import com.thoughtworks.repositories.UserRepository;
import com.thoughtworks.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserRepository userRepository;
    @Override
    public User findById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User findByEmail(String email) {
        List<User> userList = userRepository.findByEmail(email);
        if(!userList.isEmpty()) {
            return userList.get(0);
        }
        return null;
    }

    @Override
    public void createUser(User user) {
        userRepository.addUser(user);
    }

    @Override
    public void updateUser(User user) {
        userRepository.updateUser(user);
    }
}
