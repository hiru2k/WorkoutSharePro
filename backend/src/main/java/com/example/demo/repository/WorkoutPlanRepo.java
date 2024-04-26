package com.example.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.WorkoutPlan;

public interface WorkoutPlanRepo extends MongoRepository<WorkoutPlan, String> {
}