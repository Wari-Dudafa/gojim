import Database from "./Database";

export default class Set {
  id: number;
  weight: number;
  reps: number;
  time: number;

  constructor(weight: number, reps: number, time: number) {
    this.weight = weight;
    this.reps = reps;
    this.time = time;
  }
}
