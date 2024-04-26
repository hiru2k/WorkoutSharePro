import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Colors } from "../../common/Colors";
import axios from "axios";
import TodayIcon from "@mui/icons-material/Today";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LayersIcon from "@mui/icons-material/Layers";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ReplayIcon from "@mui/icons-material/Replay";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import EditWorkoutPlan from "./EditWorkoutPlan"; // Import the EditWorkoutPlanModal component

function MyWorkoutPlans() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [editingPlan, setEditingPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  useEffect(() => {
    const fetchWorkoutPlans = async () => {
      try {
        const response = await axios.get("http://localhost:8080/wplans");
        setWorkoutPlans(response.data);
      } catch (error) {
        console.error("Error fetching workout plans:", error);
      }
    };

    fetchWorkoutPlans();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const handleDeletePlan = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/wplan/${id}`);
      // Remove the deleted plan from the state
      setWorkoutPlans((prevPlans) =>
        prevPlans.filter((plan) => plan.id !== id)
      );
    } catch (error) {
      console.error("Error deleting workout plan:", error);
    }
  };

  const handleEditPlan = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8080/wplan/${id}`);
      setEditingPlan(response.data);
      setIsModalOpen(true); // Open the modal when editing starts
    } catch (error) {
      console.error("Error fetching workout plan for editing:", error);
    }
  };

  const handleSaveEdit = async (editedPlan) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/wplan/${editedPlan.id}`,
        editedPlan
      );
      const updatedPlanIndex = workoutPlans.findIndex(
        (plan) => plan.id === editedPlan.id
      );
      if (updatedPlanIndex !== -1) {
        const updatedWorkoutPlans = [...workoutPlans];
        updatedWorkoutPlans[updatedPlanIndex] = response.data;
        setWorkoutPlans(updatedWorkoutPlans);
      }
      setEditingPlan(null);
      setIsModalOpen(false); // Close the modal after saving edits
    } catch (error) {
      console.error("Error saving edited workout plan:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
    setIsModalOpen(false); // Close the modal when editing is canceled
  };

  return (
    <Box sx={{ backgroundColor: Colors.primary }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: "10px",
          margin: "-8px",
          backgroundColor: Colors.primary,
        }}
      >
        <Typography
          variant="h2"
          component="h2"
          fontWeight="bold"
          fontFamily="Montserrat"
          color="white"
        >
          Personal Fitness
        </Typography>
        <Typography
          variant="h2"
          component="h2"
          fontFamily="Montserrat"
          color="black"
          fontWeight="bold"
        >
          Routines and Exercises
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `url(/src/assets/e.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          margin: "-8px",
          mt: "5px",
          height: "2500px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            height: "59%",
            width: "95%",
            mt: "140px",
            gap: "28px",
            flexWrap: "wrap", // Allow cards to wrap to the next row
          }}
        >
          {workoutPlans.map((plan, index) => (
            <Card
              key={index}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                flexDirection: "column",
                width: "29%",
                border: "2px solid white",
                minHeight: "650px",
                backgroundColor:
                  hoveredCard === index
                    ? "rgba(252, 251, 255, 0.8)"
                    : "rgba(252, 251, 255, 0.5)",
                transition: "background-color 0.3s ease",
                transform: hoveredCard === index ? "scale(1.05)" : "scale(1)",
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.7)",
                padding: "20px",
                position: "relative",
                overflow: "hidden",
              }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  mb: "10px",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h4"
                  component="h4"
                  color="black"
                  mb="10px"
                  maxWidth="100%"
                  whiteSpace="normal"
                  fontWeight="bold"
                  textAlign="left"
                  lineHeight="1.3"
                  fontSize="20px"
                >
                  {plan.planName}
                </Typography>
              </Box>
              {plan.routines.map((routine, routineIndex) => (
                <div key={routineIndex}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "Flex-start",
                      alignItems: "Flex-start",
                      flexDirection: "row",
                      mb: "10px",
                      width: "95%",
                      ml: "40px",
                      backgroundColor: "rgba(5, 4, 18, 0.6)",
                    }}
                  >
                    <TodayIcon sx={{ color: "white", mr: "15px" }} />
                    <Typography
                      variant="h5"
                      component="h5"
                      color="white"
                      fontWeight="bold"
                      fontSize="17px"
                    >
                      {routine.name}
                    </Typography>
                  </Box>
                  {routine.exercises.map((exercise, exerciseIndex) => (
                    <div key={exerciseIndex}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Flex-start",
                          alignItems: "center",
                          flexDirection: "row",
                          mb: "10px",
                          ml: "40px",
                          width: "80%",
                          backgroundColor: "rgba(5, 4, 18, 0.4)",
                        }}
                      >
                        <DirectionsRunIcon
                          sx={{ color: "white", mr: "15px" }}
                        />
                        <Typography
                          variant="body1"
                          component="p"
                          color="white"
                          mt="5px"
                          lineHeight="1.2"
                        >
                          {exercise.name}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: "5px",
                          ml: "40px",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "30%",
                          }}
                        >
                          <LayersIcon sx={{ color: "black", mr: "15px" }} />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color="black"
                          >
                            {exercise.sets} sets
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "40%",
                          }}
                        >
                          <ReplayIcon sx={{ color: "black", mr: "15px" }} />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color="black"
                          >
                            {exercise.repetitions} repetitions
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "40%",
                          }}
                        >
                          <FitnessCenterIcon
                            sx={{ color: "black", mr: "15px" }}
                          />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color="black"
                          >
                            {exercise.weight} weight
                          </Typography>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "Flex-start",
                          alignItems: "center",
                          flexDirection: "row",
                          mb: "10px",
                          width: "60%",
                          ml: "40px",
                        }}
                      >
                        <DescriptionIcon sx={{ color: "black", mr: "15px" }} />
                        <Typography
                          variant="body2"
                          component="p"
                          color="black"
                          fontSize="12px"
                        >
                          {exercise.note}
                        </Typography>
                      </Box>
                    </div>
                  ))}
                </div>
              ))}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  mt: "auto",
                  width: "100%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    backgroundColor: Colors.secondary,
                    padding: "12px",
                    borderRadius: "5px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    marginRight: "20px",
                    marginTop: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeletePlan(plan.id)}
                >
                  <DeleteIcon sx={{ color: Colors.primary }} />
                </div>
                <div
                  style={{
                    display: "flex",
                    backgroundColor: Colors.secondary,
                    padding: "12px",
                    borderRadius: "5px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "40px",
                    marginRight: "20px",
                    marginTop: "auto",
                    cursor: "pointer",
                  }}
                  onClick={() => handleEditPlan(plan.id)}
                >
                  <EditIcon sx={{ color: Colors.primary }} />
                </div>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
      {/* Render the modal only if editingPlan is not null */}
      {editingPlan && (
        <EditWorkoutPlan
          workoutPlan={editingPlan}
          onSave={handleSaveEdit}
          onClose={handleCancelEdit}
        />
      )}
    </Box>
  );
}

export default MyWorkoutPlans;
