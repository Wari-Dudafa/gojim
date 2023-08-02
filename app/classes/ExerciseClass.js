export default class Exercise {
  constructor(config) {
    this.id = config.id;
    this.name = config.name;
    this.reps = config.reps;
    this.sets = config.sets;
  }

  UpdateExercise(config) {
    if (config.name) {
      this.name = config.name;
    }
    if (config.reps) {
      this.reps = config.reps;
    }
    if (config.sets) {
      this.sets = config.sets;
    }
  }
}
