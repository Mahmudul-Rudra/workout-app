const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
} = require("../controllers/workoutControllers");

// GET all workouts
router.get("/", getAllWorkouts);

// GET a single workout
router.get("/:id", getAWorkout);

// POST a new workout
router.post("/", createWorkout);

// DELETE a single workout
router.delete("/:id", deleteAWorkout);

// UPDATE a single workout
router.patch("/:id", updateAWorkout);

module.exports = router;
