package com.thoughtworks.entities;

import org.hibernate.validator.constraints.NotEmpty;
import org.springframework.data.annotation.Id;

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
    //@Column(name = "available_team")
    //@NotEmpty
    private Set<String> availableForTeam;
    //@Column(name = "available_team")
    //@NotEmpty
    private Set<String> availableForRole;

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

    public Set<String> getAvailableForTeam() {
        return availableForTeam;
    }

    public void setAvailableForTeam(Set<String> availableForTeam) {
        this.availableForTeam = availableForTeam;
    }

    public Set<String> getAvailableForRole() {
        return availableForRole;
    }

    public void setAvailableForRole(Set<String> availableForRole) {
        this.availableForRole = availableForRole;
    }
}
