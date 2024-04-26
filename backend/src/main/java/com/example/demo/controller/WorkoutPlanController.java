package com.example.demo.controller;

import java.io.IOException;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.model.Exercises;
import com.example.demo.model.Routines;
import com.example.demo.model.WorkoutPlan;
import com.example.demo.repository.ExerciseRepo;
import com.example.demo.repository.RoutineRepo;
import com.example.demo.repository.WorkoutPlanRepo;

import springfox.documentation.annotations.ApiIgnore;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
public class WorkoutPlanController {

    @Autowired
    WorkoutPlanRepo plan_repo;
    @Autowired
    RoutineRepo routine_repo;
    @Autowired
    ExerciseRepo exercise_repo;

    // when someone req for home page , the req redirect to swagger api
    @ApiIgnore // ignore default apis so we need to create requires apis
    @RequestMapping(value = "/")
    public void redirect(HttpServletResponse response) throws IOException {
        response.sendRedirect("/swagger-ui.html");
    }

    @GetMapping("/wplan/{id}")
    @CrossOrigin
    public ResponseEntity<WorkoutPlan> getWorkoutPlanById(@PathVariable String id) {
        WorkoutPlan workoutPlan = plan_repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found with id: " + id));
        return ResponseEntity.ok(workoutPlan);
    }

    @GetMapping("/wplans")
    @CrossOrigin
    public List<WorkoutPlan> getAllWorkoutPlans() {
        return plan_repo.findAll();
    }

    @GetMapping("/routines")
    @CrossOrigin
    public List<Routines> getAllRoutines() {
        return routine_repo.findAll();
    }

    @GetMapping("/exercises")
    @CrossOrigin
    public List<Exercises> getAllExercises() {
        return exercise_repo.findAll();
    }

    @PostMapping("/wplan")
    @CrossOrigin
    public WorkoutPlan addWorkoutPlan(@RequestBody WorkoutPlan workoutPlan) {
        return plan_repo.save(workoutPlan);
    }

    @PostMapping("/routine")
    @CrossOrigin
    public Routines addRoutine(@RequestBody Routines routine) {
        return routine_repo.save(routine);
    }

    @PostMapping("/exercise")
    @CrossOrigin
    public Exercises addExercise(@RequestBody Exercises exercise) {
        return exercise_repo.save(exercise);
    }

    @DeleteMapping("/wplan/{id}")
    @CrossOrigin
    public void deleteWorkoutPlan(@PathVariable String id) {
        plan_repo.deleteById(id);
    }

    @PutMapping("/wplan/{id}")
    @CrossOrigin
    public ResponseEntity<WorkoutPlan> editWorkoutPlan(@PathVariable String id, @RequestBody WorkoutPlan updatedPlan) {
        WorkoutPlan existingPlan = plan_repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Workout Plan not found with id: " + id));

        existingPlan.setPlanName(updatedPlan.getPlanName());
        existingPlan.setRoutines(updatedPlan.getRoutines());

        WorkoutPlan savedPlan = plan_repo.save(existingPlan);
        return ResponseEntity.ok(savedPlan);
    }
}