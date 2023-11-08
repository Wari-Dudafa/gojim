import Set from "./Set";
import Database from "./Database";

type config = {
  name: string;
  timed: boolean;
};

export default class Exercise {
  id: number;
  name: string;
  sets: Set[];
  timed: boolean;
  superSets: Exercise[];
  dropSets: Set[];

  constructor(config: number | config) {
    if (typeof config == "number") {
      // This is not a new exercise, get the data for the already exisiting exercise
    } else {
      // This is a new exercise, make a new exercise with this number name
      this.name = config.name;
      this.timed = config.timed;
    }
  }
}
