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

      let statement: string = `SELECT * FROM workouts WHERE id = ${config}`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        if (resultSet.rows.length > 0) {
          this.name = resultSet.rows._array[0].name;
        }

        let statement: string = `SELECT * FROM exercises WHERE workout_id = ${this.id}`;

        // Set the exercises
        Database.runSQL(statement).then((resultSet: SQLResultSet) => {
          if (resultSet.rows.length > 0) {
            for (
              let index: number = 0;
              index < resultSet.rows._array.length;
              index++
            ) {
              let result: any = resultSet.rows._array[index];
              this.exercises.push(new Exercise(result.id));
            }
          }
        });
      });
    } else {
      // This is a new workout, make a new workout
      this.name = config;

      let statement: string = `INSERT INTO workouts (name) VALUES('${config}')`;
      Database.runSQL(statement).then((resultSet: SQLResultSet) => {
        this.id = resultSet.insertId;
      });
    }
  }

  static async getAllWorkouts(): Promise<Workout[]> {
    let returnArray: Workout[] = [];
    let statement: string = "SELECT id FROM workouts";
    let resultSet: SQLResultSet = await Database.runSQL(statement);
    let results: any[] = resultSet.rows._array;

    if (resultSet.rows.length == 0) return returnArray;

    for (let index: number = 0; index < results.length; index++) {
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
    }, 200);
    return exercise;
  }

  rename(newName: string): void {
    // Rename this workout
    let statement: string = `SELECT workouts SET name = ${newName} WHERE id = ${this.id}`;
    Database.runSQL(statement);
  }

  delete(): void {
    // Delete the exercises
    for (let index: number = 0; index < this.exercises.length; index++) {
      let exercise: Exercise = this.exercises[index];
      exercise.delete();
    }

    // Delete this workout
    let statement: string = `DELETE FROM workouts WHERE id = ${this.id}`;
    Database.runSQL(statement);
  }
}
