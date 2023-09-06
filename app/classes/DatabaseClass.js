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
        rows: [{ rowName: "calories", rowType: "INTEGER" }],
        rows: [{ rowName: "protein", rowType: "INTEGER" }],
        rows: [{ rowName: "carbs", rowType: "INTEGER" }],
        rows: [{ rowName: "fats", rowType: "INTEGER" }],
        rows: [{ rowName: "month", rowType: "INTEGER" }],
        rows: [{ rowName: "day", rowType: "INTEGER" }],
        rows: [{ rowName: "year", rowType: "INTEGER" }],
        rows: [{ rowName: "date", rowType: "TEXT" }],
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
      let statement = "DROP TABLE IF EXISTS " + tableName + "";
      this.sql(statement, () => {});
    }
    this.init();
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
          console.error(error);
        }
      );
    });
  }
}
