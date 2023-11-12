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
  name: string;
  sets: Set[];
  timed: boolean;
  superSets: Exercise[];
  dropSets: Set[];
  workoutId: number;

  constructor(config: number | config) {
    if (typeof config == "number") {
      // This is not a new exercise, get the data for the already exisiting exercise
      this.id = config;

      let statement = `SELECT * FROM exercises WHERE id = ${config}`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        if (resultSet.rows.length > 0) {
          this.name = resultSet.rows._array[0].name;
          this.workoutId = resultSet.rows._array[0].workout_id;
          this.timed = Boolean(resultSet.rows._array[0].timed);
        }
        // Grab set and other data...
      });
    } else {
      // This is a new exercise, make a new exercise with this number name
      let bool: number;
      this.name = config.name;
      this.timed = config.timed;
      this.workoutId = config.workoutId;

      if (config.timed) {
        bool = 1;
      } else {
        bool = 0;
      }

      let statement = `INSERT INTO exercises (name, timed, workout_id) VALUES('${config.name}', ${bool}, ${config.workoutId})`;
      Database.runSQL(statement);
    }
  }
}
