import Set from "./Set";
import Database from "./Database";

export default class Exercise {
  id: number;
  name: string;
  sets: Set[];
  timed: boolean;
  superSets: Exercise[];
  dropSets: Set[];

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
    
    if (id) {
      // This is not a new exercise, get the data for the already exisiting exercise
    } else {
      // This is a new exercise, make a new exercise
    }
  }
}
