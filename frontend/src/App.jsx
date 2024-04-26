import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreatePlan from "./components/mainpages/workoutplans/CreatePlan";

import MyWorkoutPlans from "./components/mainpages/workoutplans/MyWorkoutPlans";
import SharedWorkoutPlans from "./components/mainpages/workoutplans/SharedWorkoutPlans";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<CreatePlan />} />

          <Route exact path="/my_workout_plans" element={<MyWorkoutPlans />} />
          <Route
            exact
            path="/shared_workout_plans"
            element={<SharedWorkoutPlans />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
