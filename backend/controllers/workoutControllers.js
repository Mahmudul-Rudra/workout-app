const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");

// GET ALL Workouts
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdAt: -1 });

  res.status(200).json({ workouts });
};

// GET A SINGLE WorkOUTS
const getAWorkout = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ message: "No such workout found" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ message: "No such workout found" });
  }
  res.status(200).json(workout);
};

// POST A NEW Workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;

  //   add doc to db
  try {
    const workout = await Workout.create({ title, reps, load });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

// DELETE A Workout
const deleteAWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const workout = await Workout.findOneAndDelete({ _id: id });
  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};

// UPDATE A Workout
const updateAWorkout = async (req, res) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "Invalid id" });
  }

  const workout = await Workout.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!workout) {
    return res.status(404).json({ error: "No such workout found" });
  }
  res.status(200).json(workout);
};

// exporting functions
module.exports = {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
};
