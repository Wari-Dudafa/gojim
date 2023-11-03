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
}
