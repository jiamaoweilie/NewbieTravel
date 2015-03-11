package com.thoughtworks.entities;

import org.hibernate.validator.constraints.Email;
import org.springframework.data.annotation.Id;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private String id;
    @Email
    @NotNull
    private String email;

    private String team;

    private String role;

    public String getTeam() {
        return this.team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public String getRole() {
        return this.role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    List<String> inProcess;

    List<String> finished;

    public User(String email) {
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

    public List<String> getInProcess() {
        return inProcess;
    }

    public void setInProcess(List<String> inProcess) {
        this.inProcess = inProcess;
    }

    public List<String> getFinished() {
        return finished;
    }

    public void setFinished(List<String> finished) {
        this.finished = finished;
    }
}
