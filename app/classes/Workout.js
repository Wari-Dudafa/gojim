import Exercise from "./Exercise";

export default class Workout {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
  }

  static getAllWorkouts() {
    return [
      new Workout({ id: 1, name: "Chest day" }),
      new Workout({ id: 2, name: "Leg day" }),
      new Workout({ id: 3, name: "Cardio" }),
      new Workout({ id: 4, name: "Back day" }),
      new Workout({ id: 5, name: "Arm day" }),
    ];
  }

  getExercises() {
    return [
      new Exercise({ id: 1, name: this.name }),
      new Exercise({ id: 2, name: "Squats" }),
      new Exercise({ id: 3, name: "Bench Press" }),
      new Exercise({ id: 4, name: "Deadlifts" }),
      new Exercise({ id: 5, name: "Pullups" }),
      new Exercise({ id: 6, name: "Pushups" }),
      new Exercise({ id: 7, name: this.name }),
    ];
  }
}
