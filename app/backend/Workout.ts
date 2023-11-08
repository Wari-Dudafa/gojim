import Exercise from "./Exercise";
import Database from "./Database";

export default class Workout {
  id: number;
  name: string;
  exercises: Exercise[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;

    if (id) {
      // This is not a new workout, get the data for the already exisiting workout
    } else {
      // This is a new workout, make a new workout
    }
    this.exercises = [
      new Exercise(null, this.name),
      new Exercise(null, "Squats"),
      new Exercise(null, "Bench Press"),
      new Exercise(null, "Deadlifts"),
      new Exercise(null, "Pullups"),
      new Exercise(null, "Pushups"),
      new Exercise(null, this.name),
    ];
  }

  static getAllWorkouts(): Workout[] {
    return [
      new Workout(null, "Chest day"),
      new Workout(null, "Leg day"),
      new Workout(null, "Cardio"),
      new Workout(null, "Back day"),
      new Workout(null, "Arm day"),
    ];
  }

  getExercises(): Exercise[] {
    return this.exercises;
  }

  addExercise(exercise: Exercise): void {
    console.log(exercise.name + " was added to this workout");
  }
}
