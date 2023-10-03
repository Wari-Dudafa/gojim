import { openDatabase } from "expo-sqlite";
import { Alert } from "react-native";

export default class Database {
  constructor() {
    this.db = openDatabase("gojim.db");
    this.tables = [
      // They all have an incrementing id as a primary key
      {
        name: "exercises",
        rows: [
          { rowName: "name", rowType: "TEXT" },
          { rowName: "reps", rowType: "INTEGER" },
          { rowName: "sets", rowType: "INTEGER" },
          { rowName: "day_id", rowType: "INTEGER" },
        ],
      },
      {
        name: "timed_exercises",
        rows: [
          { rowName: "name", rowType: "TEXT" },
          { rowName: "reps", rowType: "INTEGER" },
          { rowName: "sets", rowType: "INTEGER" },
          { rowName: "day_id", rowType: "INTEGER" },
          { rowName: "time_in_seconds", rowType: "INTEGER" },
        ],
      },
      {
        name: "session",
        rows: [
          { rowName: "date", rowType: "TEXT" },
          { rowName: "day_id", rowType: "INTEGER" },
        ],
      },
      {
        name: "sets",
        rows: [
          { rowName: "date", rowType: "TEXT" },
          { rowName: "session_id", rowType: "INTEGER" },
          { rowName: "exercise_id", rowType: "INTEGER" },
        ],
      },
      {
        name: "reps_per_set",
        rows: [
          { rowName: "sets_id", rowType: "INTEGER" },
          { rowName: "rep_count", rowType: "INTEGER" },
        ],
      },
      {
        name: "weight_per_set",
        rows: [
          { rowName: "sets_id", rowType: "INTEGER" },
          { rowName: "weight_kg", rowType: "INTEGER" },
          { rowName: "weight_lbs", rowType: "INTEGER" },
        ],
      },
      {
        name: "user_weight",
        rows: [
          { rowName: "date", rowType: "TEXT" },
          { rowName: "weight_kg", rowType: "INTEGER" },
          { rowName: "weight_lbs", rowType: "INTEGER" },
        ],
      },
      {
        name: "days",
        rows: [{ rowName: "name", rowType: "TEXT" }],
      },
      {
        name: "meals",
        rows: [
          { rowName: "day", rowType: "INTEGER" },
          { rowName: "month", rowType: "INTEGER" },
          { rowName: "year", rowType: "INTEGER" },
          { rowName: "calories", rowType: "INTEGER" },
          { rowName: "protein", rowType: "INTEGER" },
          { rowName: "carbs", rowType: "INTEGER" },
          { rowName: "fats", rowType: "INTEGER" },
          { rowName: "date", rowType: "TEXT" },
        ],
      },
    ];
  }

  init() {
    // Initialise all tables required for the application
    for (let index = 0; index < this.tables.length; index++) {
      let table = this.tables[index];
      let rows = table.rows;
      let statement =
        "CREATE TABLE IF NOT EXISTS " +
        table.name +
        " (id INTEGER PRIMARY KEY AUTOINCREMENT, ";

      // Construct the sql staement
      for (let index = 0; index < rows.length; index++) {
        let rowName = rows[index].rowName;
        let rowType = rows[index].rowType;
        let final;

        if (index == rows.length - 1) {
          final = ")";
        } else {
          final = ", ";
        }

        statement = statement + rowName + " " + rowType + final;
      }

      // Run the sql statement
      this.sql(statement, () => {});
    }
  }

  wipeDatabase() {
    // Drops all tables
    for (let index = 0; index < this.tables.length; index++) {
      let tableName = this.tables[index].name;
      this.dropTable(tableName);
    }
    this.init();
  }

  dropTable(tableName) {
    let statement;

    if (tableName.length == 0) {
      Alert.alert(
        "An error occured dropping the table, please try again later"
      );
    } else {
      statement = "DROP TABLE IF EXISTS " + tableName;
      this.sql(statement, () => {});
    }
  }

  sql(statement, callback) {
    this.db.transaction((tx) => {
      tx.executeSql(
        statement,
        null,
        (txObj, resultSet) => callback(resultSet),
        (txObj, error) => {
          Alert.alert(
            "An error occured with the database, please try again later"
          );
          this.init();
          console.error(error);
        }
      );
    });
  }
}
