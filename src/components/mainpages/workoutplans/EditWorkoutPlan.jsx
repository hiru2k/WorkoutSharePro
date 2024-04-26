import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Colors } from "../../common/Colors";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

function EditWorkoutPlan({ workoutPlan, onSave, onClose }) {
  const [editedPlan, setEditedPlan] = useState(workoutPlan);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedPlan({ ...editedPlan, [name]: value });
  };

  const handleChangeRoutineName = (e, routineIndex) => {
    const newRoutines = [...editedPlan.routines];
    newRoutines[routineIndex].name = e.target.value;
    setEditedPlan((prevState) => ({
      ...prevState,
      routines: newRoutines,
    }));
  };

  const handleChangeExercise = (e, routineIndex, exerciseIndex) => {
    const { name, value } = e.target;
    const updatedPlan = { ...editedPlan };
    updatedPlan.routines[routineIndex].exercises[exerciseIndex][name] = value;
    setEditedPlan(updatedPlan);
  };

  const handleSave = () => {
    onSave(editedPlan);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflowY: "auto",
        minHeight: "90%",
        mt: "10px",
      }}
    >
      <Modal
        open={true}
        onClose={onClose}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90%",
          padding: "10px",
          mb: "10px",

          overflowY: "auto",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            mt: "20%",
            minHeight: "90%",
            overflowY: "auto",
            backgroundColor: Colors.primary,
            width: "50%",
          }}
        >
          <Typography variant="h5" color="white" fontWeight="bold" mt="10px">
            Edit Workout Plan
          </Typography>

          <TextField
            label="Plan Name"
            variant="outlined"
            id="planName"
            name="planName"
            value={editedPlan.planName}
            onChange={handleChange}
            sx={{
              marginBottom: "5px",
              width: "300px",
              mt: "10px",
              "& input": {
                color: Colors.white, // Set text color to black
              },
              "& .MuiOutlinedInput-root": {
                backgroundColor: "black",
                "& fieldset": {
                  borderColor: "white", // Set border color to white
                },
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: Colors.primary, // Set border color to orange on hover
                },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: Colors.primary, // Set border color to orange on focus
                },
              "& .MuiOutlinedInput-root.Mui-focused input": {
                color: Colors.white, // Set font color to orange on focus
              },
              "& .MuiInputLabel-root.Mui-focused": {
                color: Colors.white, // Set label text color to yellow on focus
              },
              "& .MuiInputLabel-root": {
                color: Colors.white, // Set label text color to orange
              },
              "& textarea": {
                color: Colors.white, // Set text color to white
              },

              "& textarea:focus": {
                color: Colors.white, // Set text color to white on focus
              },
            }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              mt: "20px",
            }}
          >
            {editedPlan.routines.map((routine, routineIndex) => (
              <Box
                key={routineIndex}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "center",
                  flexDirection: "column",
                  mt: "15px",
                  backgroundColor: "rgba(252, 251, 255, 0.5)",
                  padding: "15px",
                  width: "100%",
                }}
              >
                <TextField
                  id={`routineName${routineIndex}`}
                  label="Routine Name"
                  variant="outlined"
                  value={routine.name}
                  onChange={(e) => handleChangeRoutineName(e, routineIndex)}
                  sx={{
                    marginBottom: "5px",
                    width: "300px",
                    "& input": {
                      color: Colors.white, // Set text color to black
                    },
                    "& .MuiOutlinedInput-root": {
                      backgroundColor: "black",
                      "& fieldset": {
                        borderColor: "white", // Set border color to white
                      },
                    },

                    "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: Colors.primary, // Set border color to orange on hover
                      },
                    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                      {
                        borderColor: Colors.primary, // Set border color to orange on focus
                      },
                    "& .MuiOutlinedInput-root.Mui-focused input": {
                      color: Colors.white, // Set font color to orange on focus
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: Colors.white, // Set label text color to yellow on focus
                    },
                    "& .MuiInputLabel-root": {
                      color: Colors.white, // Set label text color to orange
                    },
                    "& textarea": {
                      color: Colors.white, // Set text color to white
                    },

                    "& textarea:focus": {
                      color: Colors.white, // Set text color to white on focus
                    },
                  }}
                />
                {routine.exercises.map((exercise, exerciseIndex) => (
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "flex-start",
                      justifyContent: "center",
                      flexDirection: "column",
                      mt: "20px",
                      width: "100%",

                      backgroundColor: "rgba(252, 251, 255, 0.3)",
                    }}
                  >
                    <Box
                      key={exerciseIndex}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <TextField
                        id={`exerciseName${routineIndex}-${exerciseIndex}`}
                        label="Exercise Name"
                        variant="outlined"
                        name="name"
                        value={exercise.name}
                        onChange={(e) =>
                          handleChangeExercise(e, routineIndex, exerciseIndex)
                        }
                        sx={{
                          marginBottom: "5px",
                          width: "300px",
                          "& input": {
                            color: Colors.white, // Set text color to black
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "black",
                            "& fieldset": {
                              borderColor: "white", // Set border color to white
                            },
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on hover
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on focus
                            },
                          "& .MuiOutlinedInput-root.Mui-focused input": {
                            color: Colors.white, // Set font color to orange on focus
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: Colors.white, // Set label text color to yellow on focus
                          },
                          "& .MuiInputLabel-root": {
                            color: Colors.white, // Set label text color to orange
                          },
                          "& textarea": {
                            color: Colors.white, // Set text color to white
                          },

                          "& textarea:focus": {
                            color: Colors.white, // Set text color to white on focus
                          },
                        }}
                      />
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "row",
                        mt: "20px",
                      }}
                    >
                      <TextField
                        label="Sets"
                        variant="outlined"
                        id={`sets${routineIndex}-${exerciseIndex}`}
                        name="sets"
                        value={exercise.sets}
                        onChange={(e) =>
                          handleChangeExercise(e, routineIndex, exerciseIndex)
                        }
                        sx={{
                          marginBottom: "5px",
                          width: "100px",
                          mr: "3px",
                          "& input": {
                            color: Colors.white, // Set text color to black
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "black",
                            "& fieldset": {
                              borderColor: "white", // Set border color to white
                            },
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on hover
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on focus
                            },
                          "& .MuiOutlinedInput-root.Mui-focused input": {
                            color: Colors.white, // Set font color to orange on focus
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: Colors.white, // Set label text color to yellow on focus
                          },
                          "& .MuiInputLabel-root": {
                            color: Colors.white, // Set label text color to orange
                          },
                          "& textarea": {
                            color: Colors.white, // Set text color to white
                          },

                          "& textarea:focus": {
                            color: Colors.white, // Set text color to white on focus
                          },
                        }}
                      />
                      <TextField
                        label="Repetitions"
                        variant="outlined"
                        id={`repetitions${routineIndex}-${exerciseIndex}`}
                        name="repetitions"
                        value={exercise.repetitions}
                        onChange={(e) =>
                          handleChangeExercise(e, routineIndex, exerciseIndex)
                        }
                        sx={{
                          marginBottom: "5px",
                          width: "100px",
                          mr: "3px",
                          "& input": {
                            color: Colors.white, // Set text color to black
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "black",
                            "& fieldset": {
                              borderColor: "white", // Set border color to white
                            },
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on hover
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on focus
                            },
                          "& .MuiOutlinedInput-root.Mui-focused input": {
                            color: Colors.white, // Set font color to orange on focus
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: Colors.white, // Set label text color to yellow on focus
                          },
                          "& .MuiInputLabel-root": {
                            color: Colors.white, // Set label text color to orange
                          },
                          "& textarea": {
                            color: Colors.white, // Set text color to white
                          },

                          "& textarea:focus": {
                            color: Colors.white, // Set text color to white on focus
                          },
                        }}
                      />
                      <TextField
                        label="Weight"
                        variant="outlined"
                        id={`weight${routineIndex}-${exerciseIndex}`}
                        name="weight"
                        value={exercise.weight}
                        onChange={(e) =>
                          handleChangeExercise(e, routineIndex, exerciseIndex)
                        }
                        sx={{
                          marginBottom: "5px",
                          width: "100px",
                          mr: "3px",
                          "& input": {
                            color: Colors.white, // Set text color to black
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "black",
                            "& fieldset": {
                              borderColor: "white", // Set border color to white
                            },
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on hover
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on focus
                            },
                          "& .MuiOutlinedInput-root.Mui-focused input": {
                            color: Colors.white, // Set font color to orange on focus
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: Colors.white, // Set label text color to yellow on focus
                          },
                          "& .MuiInputLabel-root": {
                            color: Colors.white, // Set label text color to orange
                          },
                          "& textarea": {
                            color: Colors.white, // Set text color to white
                          },

                          "& textarea:focus": {
                            color: Colors.white, // Set text color to white on focus
                          },
                        }}
                      />
                      <TextField
                        label="Note"
                        variant="outlined"
                        id={`note${routineIndex}-${exerciseIndex}`}
                        name="note"
                        value={exercise.note}
                        onChange={(e) =>
                          handleChangeExercise(e, routineIndex, exerciseIndex)
                        }
                        sx={{
                          marginBottom: "5px",
                          width: "300px",
                          "& input": {
                            color: Colors.white, // Set text color to black
                          },
                          "& .MuiOutlinedInput-root": {
                            backgroundColor: "black",
                            "& fieldset": {
                              borderColor: "white", // Set border color to white
                            },
                          },
                          "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on hover
                            },
                          "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                            {
                              borderColor: Colors.primary, // Set border color to orange on focus
                            },
                          "& .MuiOutlinedInput-root.Mui-focused input": {
                            color: Colors.white, // Set font color to orange on focus
                          },
                          "& .MuiInputLabel-root.Mui-focused": {
                            color: Colors.white, // Set label text color to yellow on focus
                          },
                          "& .MuiInputLabel-root": {
                            color: Colors.white, // Set label text color to orange
                          },
                          "& textarea": {
                            color: Colors.white, // Set text color to white
                          },

                          "& textarea:focus": {
                            color: Colors.white, // Set text color to white on focus
                          },
                        }}
                      />
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",

              padding: "12px",
              borderRadius: "5px",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              cursor: "pointer",
            }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: Colors.white,
                padding: "12px",
                borderRadius: "5px",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                marginRight: "10px",
                cursor: "pointer",
              }}
              onClick={handleSave}
            >
              <SaveIcon sx={{ color: "black" }} />
            </div>
            <div
              style={{
                display: "flex",
                backgroundColor: Colors.white,
                padding: "12px",
                borderRadius: "5px",
                alignItems: "center",
                justifyContent: "center",
                width: "40px",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              <CancelIcon sx={{ color: "black" }} />
            </div>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}

export default EditWorkoutPlan;
