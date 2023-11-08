import Exercise from "./Exercise";
import Database from "./Database";
import { SQLResultSet } from "expo-sqlite";

export default class Workout {
  id: number;
  name: string;
  exercises: Exercise[];

  constructor(config: number | string) {
    if (typeof config == "number") {
      // This is not a new workout, get the data for the already exisiting workout
      this.id = config;
      let statement = `SELECT * FROM workouts WHERE id = ${config}`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        if (resultSet.rows.length > 0) {
          this.name = resultSet.rows._array[0].name;
        }
      });
    } else {
      // This is a new workout, make a new workout
      this.name = config;
      let statement = `INSERT INTO workouts (name) VALUES('${config}')`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        this.id = resultSet.insertId;
      });
    }
  }

  static getAllWorkouts(): Promise<Workout[]> {
    let statement = "SELECT id FROM workouts";

    return Database.runSQL(statement).then((resultSet: SQLResultSet) => {
      let results = resultSet.rows._array;
      let returnArray: Workout[] = [];

      if (resultSet.rows.length == 0) return returnArray;
      for (let index = 0; index < results.length; index++) {
        let workout = results[index];
        returnArray.push(new Workout(workout.id));
      }

      return returnArray;
    });
  }

  getExercises(): Exercise[] {
    this.exercises = [
      new Exercise({ name: this.name, timed: false }),
      new Exercise({ name: "Squats", timed: false }),
      new Exercise({ name: "Bench Press", timed: false }),
      new Exercise({ name: this.name, timed: false }),
      new Exercise({ name: "Deadlifts", timed: false }),
      new Exercise({ name: "Pullups", timed: false }),
      new Exercise({ name: "Pushups", timed: false }),
      new Exercise({ name: this.name, timed: false }),
    ];
    return this.exercises;
  }

  addExercise(exercise: Exercise): void {
    console.log(exercise.name + " was added to this workout");
  }
}
