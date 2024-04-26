package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.Exercises;

public interface ExerciseRepo extends MongoRepository<Exercises, String> {
}
