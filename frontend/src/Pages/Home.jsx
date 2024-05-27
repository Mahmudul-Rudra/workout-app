import React from "react";
import { useEffect } from "react";

// Components
import WorkoutDetails from "../Components/WorkoutDetails";
import WorkoutForm from "../Components/WorkoutForm";

// hooks
import { useWorkoutContext } from "../hooks/useWorkoutContext";

const Home = () => {
  // for checking we have created some local states
  // const [workouts, setWorkouts] = useState(null);

  //using hooks
  const { workouts, dispatch } = useWorkoutContext();

  // Fetch Data from API in the Backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts");
      const json = await response.json();

      // checking if we have the wrokouts array of objects, if the response is okay then we will set the array inside json to workouts
      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
