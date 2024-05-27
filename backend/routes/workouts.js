const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  UpdateWorkout,
} = require("../controller/workoutController");



// Get All Workouts
router.get("/", getAllWorkouts);

// Create a New Workout
router.post("/", createWorkout);

// Get Single Workout
router.get("/:id", getSingleWorkout);

// Delete a Single Workout
router.delete("/:id", deleteWorkout);

// Update a Single Workout
router.patch("/:id", UpdateWorkout);

module.exports = router;
