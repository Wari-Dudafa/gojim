import Set from "./Set";
import Database from "./Database";
import { SQLResultSet } from "expo-sqlite";

type config = {
  name: string;
  timed: boolean;
  workoutId: number;
};

export default class Exercise {
  id: number;
  sets: Set[];
  name: string;
  timed: boolean;
  dropSets: Set[];
  workoutId: number;
  superSets: Exercise[];

  constructor(config: number | config) {
    if (typeof config == "number") {
      // This is not a new exercise, get the data for the already exisiting exercise
      this.id = config;

      let statement: string = `SELECT * FROM exercises WHERE id = ${config}`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        if (resultSet.rows.length > 0) {
          let result: any[] = resultSet.rows._array;

          this.name = result[0].name;
          this.workoutId = result[0].workout_id;
          this.timed = Boolean(result[0].timed);
        }
        // Grab set and other data...
      });
    } else {
      // This is a new exercise, make a new exercise with this number name
      let timedAsANumber: number;
      this.name = config.name;
      this.timed = config.timed;
      this.workoutId = config.workoutId;

      if (config.timed) {
        timedAsANumber = 1;
      } else {
        timedAsANumber = 0;
      }

      let statement: string = `INSERT INTO exercises (name, timed, workout_id) VALUES('${config.name}', ${timedAsANumber}, ${config.workoutId})`;
      Database.runSQL(statement);
    }
  }

  rename(newName: string): void {
    // Rename this exercise
    let statement: string = `SELECT exercises SET name = ${newName} WHERE id = ${this.id}`;
    Database.runSQL(statement);
  }

  delete(): void {
    // Delete this exercise
    let statement: string = `DELETE FROM exercises WHERE id = ${this.id}`;
    Database.runSQL(statement);
  }

  // I dont know what to call this function yet, but the idea is:
  // It gets data from your last workout so you can compare to this one
  async getLastSet(): Promise<Set[]> {
    return [new Set(1, 1, null)];
  }
}
