import Database from "./Database";

export default class Set {
  id: number;
  time: number;
  reps: number;
  weight: number;

  constructor(weight: number, reps: number, time: number) {
    this.weight = weight;
    this.reps = reps;
    this.time = time;
  }
}
