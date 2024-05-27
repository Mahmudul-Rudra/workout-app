const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// Get All Workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });
  try {
    res.status(200).json(workouts);
  } catch (error) {
    res.status(400).json({ err: error.message });
  }
};

// Get a single Workout
const getSingleWorkout = async (req, res) => {
  const { id } = req.params;

  // Checking if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "No such workout" });
  } else {
    res.status(200).json(workout);
  }
};

// Create a New Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  // error handling if any info is missing
  let emptyFields = [];
  if (!title) {
    emptyFields.push("title");
  }
  if (!load) {
    emptyFields.push("load");
  }
  if (!reps) {
    emptyFields.push("reps");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields", emptyFields });
  }

  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Single Workout
const deleteWorkout = async (req, res) => {
  const { id } = req.params;

  // check if the id is valid or not
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndDelete({ _id: id });
  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(400).json({ err: error.message });
  }
};

// Update a Single Workout
const UpdateWorkout = async (req, res) => {
  const { id } = req.params;

  // checking if the id is valid
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such workout" });
  }

  const workout = await Workout.findByIdAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );
  if (workout) {
    res.status(200).json(workout);
  } else {
    res.status(400).json({ err: error.message });
  }
};

// exporting the functions
module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  deleteWorkout,
  UpdateWorkout,
};
