import React, { useState } from "react";

// hooks
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const WorkoutForm = () => {
  // Creating state for each of the different properties of the new Workout that user gonna type into this form
  const { dispatch } = useWorkoutContext();
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    // after submission the page will be refreshed by default so we don't need to refresh
    e.preventDefault();

    // Dummy workout object
    const workout = { title, reps, load };

    // fetch api to send post request
    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout), // we can send the workout just as an object, we have to send them as json
      headers: { "Content-Type": "application/json" },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setTitle("");
      setLoad("");
      setReps("");
      setError(null);
      setEmptyFields([]);
      console.log("New Workout added");
      dispatch({
        type: "CREATE_WORKOUT",
        payload: json,
      });
    }
  };

  return (
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Workout</h3>
      <label>Exercise Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Load (kg):</label>
      <input
        type="number"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={emptyFields.includes("load") ? "error" : ""}
      />

      <label>Reps:</label>
      <input
        type="number"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={emptyFields.includes("reps") ? "error" : ""}
      />

      <button type="submit">Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;
