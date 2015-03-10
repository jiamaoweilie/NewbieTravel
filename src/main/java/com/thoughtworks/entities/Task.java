package com.thoughtworks.entities;

import com.thoughtworks.entities.util.Role;
import com.thoughtworks.entities.util.Team;
import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.util.Set;

@Entity
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    String id;
    @NotEmpty
    String name;
    @NotEmpty
    String guard;
    @NotEmpty
    String context;
    @NotEmpty
    String type;
    @Column(name = "available_team")
    @NotEmpty
    private Set<Team> availableForTeam;
    @Column(name = "available_team")
    @NotEmpty
    private Set<Role> availableForRole;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getGuard() {
        return guard;
    }

    public void setGuard(String guard) {
        this.guard = guard;
    }

    public String getContext() {
        return context;
    }

    public void setContext(String context) {
        this.context = context;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Set<Team> getAvailableForTeam() {
        return availableForTeam;
    }

    public void setAvailableForTeam(Set<Team> availableForTeam) {
        this.availableForTeam = availableForTeam;
    }

    public Set<Role> getAvailableForRole() {
        return availableForRole;
    }

    public void setAvailableForRole(Set<Role> availableForRole) {
        this.availableForRole = availableForRole;
    }
}
