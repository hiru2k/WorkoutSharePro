import React, { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Colors } from "../../common/Colors";
import Avatar from "@mui/material/Avatar";
import axios from "axios";

import TodayIcon from "@mui/icons-material/Today";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import LayersIcon from "@mui/icons-material/Layers";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ReplayIcon from "@mui/icons-material/Replay";
import DescriptionIcon from "@mui/icons-material/Description";

function SharedWorkoutPlans() {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);

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

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "70%",

        gap: "20px",
        backgroundColor: "#f0f2f5",
        margin: "-8px",
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
            marginTop: "10px",
            width: "900px",
            border: "2px solid #F5F5F5",
            minHeight: "500px",
            transition: "background-image 0.3s ease",
            transform: hoveredCard === index ? "scale(1.01)" : "scale(1)",
            borderRadius: "6px",
            padding: "20px",
            color: Colors.white,
            position: "relative",
          }}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
        >
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "row",
              alignItems: "flex-start",
              width: "100%",
            }}
          >
            <Avatar
              alt="Profile Photo"
              src="/src/assets/avatar.jpg"
              sx={{
                mr: "5px",
                mt: "-15px",
                width: "50px",
                height: "50px",
                border: "2px solid white",
              }}
            />
            <Typography
              variant="body1"
              component="h4"
              color={Colors.secondary}
              mb="10px"
              fontSize="13px"
              fontWeight="bold"
            >
              Amal Perera
            </Typography>
          </Box>
          <Typography
            variant="body1"
            component="body1"
            color={Colors.secondary}
            mb="10px"
            fontSize="16px"
          >
            {plan.planName}
          </Typography>
          <Box
            sx={{
              border: "2px solid #F5F5F5",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              flexDirection: "column",
              width: "1000px",
              minHeight: "370px",
              padding: "10px",
              ml: "-30px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                mt: "10px",
              }}
            ></Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "Flex-start",
                alignItems: "Flex-start",
                flexDirection: "column",
                width: "100%",
                mt: "10px",
                ml: "50px",
              }}
            >
              {plan.routines.map((routine, routineIndex) => (
                <div key={routineIndex}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "Flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      mb: "10px",
                      width: "200px",
                    }}
                  >
                    <TodayIcon sx={{ color: "black", mr: "15px" }} />
                    <Typography
                      variant="h5"
                      component="h5"
                      color={Colors.secondary}
                      fontSize="16px"
                      fontWeight="bold"
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
                          width: "200px",
                        }}
                      >
                        <DirectionsRunIcon
                          sx={{ color: "black", mr: "15px" }}
                        />
                        <Typography
                          variant="body1"
                          component="p"
                          color={Colors.secondary}
                          mt="5px"
                          fontSize="16px"
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
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "150px",
                          }}
                        >
                          {" "}
                          <LayersIcon sx={{ color: "black", mr: "15px" }} />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color={Colors.secondary}
                          >
                            {exercise.sets} sets
                          </Typography>{" "}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "150px",
                          }}
                        >
                          <ReplayIcon sx={{ color: "black", mr: "15px" }} />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color={Colors.secondary}
                          >
                            {exercise.repetitions} repetitions
                          </Typography>{" "}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "150px",
                          }}
                        >
                          <FitnessCenterIcon
                            sx={{ color: "black", mr: "15px" }}
                          />
                          <Typography
                            variant="body2"
                            component="p"
                            mr="20px"
                            color={Colors.secondary}
                          >
                            {exercise.weight} weight
                          </Typography>{" "}
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "Flex-start",
                            alignItems: "center",
                            flexDirection: "row",
                            mb: "10px",
                            width: "450px",
                          }}
                        >
                          <DescriptionIcon
                            sx={{ color: "black", mr: "15px" }}
                          />
                          <Typography
                            variant="body2"
                            component="p"
                            maxWidth="390px"
                            whiteSpace="normal"
                            color={Colors.secondary}
                          >
                            {exercise.note}
                          </Typography>
                        </Box>{" "}
                      </Box>
                    </div>
                  ))}
                </div>
              ))}
            </Box>
          </Box>
        </Card>
      ))}
    </Box>
  );
}

export default SharedWorkoutPlans;
