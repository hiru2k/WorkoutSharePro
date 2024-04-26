package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "exercises")
public class Exercises {
    private String name;

    public Exercises() {
    }

    public Exercises(String name) {
        this.name = name;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
