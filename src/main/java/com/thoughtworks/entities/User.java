package com.thoughtworks.entities;

import com.thoughtworks.entities.util.Role;
import com.thoughtworks.entities.util.Team;
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

//    private enum Team {swordfish, terracotta};
//    @Column(name = "team")
    private Team team;

//    private enum  Role {BA, QA, Dev};
//    @Column(name = "role")
    private Role role;

    public String getTeam() {
        return this.team.getName();
    }

    public void setTeam(String teamName) {
        for (Team t : Team.values()) {
            if (t.getName().equals(teamName))
                this.team = t;
        }
    }

    public String getRole() {
        return this.role.getName();
    }

    public void setRole(String roleName) {
        for (Role r : Role.values()) {
            if (r.getName().equals(roleName))
                this.role = r;
        }
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
