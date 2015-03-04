package com.thoughtworks.entities;

import org.springframework.data.annotation.Id;

import java.util.List;

public class User {
    @Id
    private String id;

    private String email;

    List<String> inProcess;

    List<String> finished;

    public User(String id, String email) {
        this.id = id;
        this.email = email;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
