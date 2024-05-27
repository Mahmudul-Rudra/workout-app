import { WorkoutContext } from "../context/WorkoutContext";
import { useContext } from "react";

export const useWorkoutContext = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw Error(
      "UseWorkoutContext must be use inside a an WorkoutContextProvider..."
    );
  }
  return context;
};
