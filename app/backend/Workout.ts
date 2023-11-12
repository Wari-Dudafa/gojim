import Exercise from "./Exercise";
import Database from "./Database";
import { SQLResultSet } from "expo-sqlite";

export default class Workout {
  id: number;
  name: string;
  exercises: Exercise[];

  constructor(config: number | string) {
    this.exercises = [];
    if (typeof config == "number") {
      // This is not a new workout, get the data for the already exisiting workout
      this.id = config;

      let statement = `SELECT * FROM workouts WHERE id = ${config}`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        if (resultSet.rows.length > 0) {
          this.name = resultSet.rows._array[0].name;
        }

        let statement = `SELECT * FROM exercises WHERE workout_id = ${this.id}`;

        // Set the exercises
        Database.runSQL(statement).then((resultSet: SQLResultSet) => {
          if (resultSet.rows.length > 0) {
            for (let index = 0; index < resultSet.rows._array.length; index++) {
              this.exercises.push(
                new Exercise(resultSet.rows._array[index].id)
              );
            }
          }
        });
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

  static async getAllWorkouts(): Promise<Workout[]> {
    let statement = "SELECT id FROM workouts";

    const resultSet = await Database.runSQL(statement);
    let results = resultSet.rows._array;
    let returnArray: Workout[] = [];
    if (resultSet.rows.length == 0) return returnArray;
    for (let index = 0; index < results.length; index++) {
      let workout = results[index];
      returnArray.push(new Workout(workout.id));
    }
    return returnArray;
  }

  getExercises(): Exercise[] {
    return this.exercises;
  }

  addExercise(name: string, timed: boolean): Exercise {
    let exercise: Exercise;
    // Give the async act of making a new workout time to complete
    setTimeout(() => {
      exercise = new Exercise({
        name: name,
        timed: timed,
        workoutId: this.id,
      });
    }, 150);
    return exercise;
  }
}
