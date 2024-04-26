package com.example.demo.model;

import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "routines")
public class Routines {
    private String name;

    // defalut constructor to create instance without parssing any parameters.
    public Routines() {
    }

    public Routines(String name) {
        this.name = name;

    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
