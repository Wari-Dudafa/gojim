import * as SQLite from "expo-sqlite";

export default class Database {
  constructor() {
    this.db = SQLite.openDatabase("fitone.db");
  }

  init() {
    // Initialise all tables required for the application
    tables = [
      {
        name: "exercises",
        rows: [
          { rowName: "name", rowType: "TEXT" },
          { rowName: "reps", rowType: "INTEGER" },
          { rowName: "sets", rowType: "INTEGER" },
        ],
      },
    ];

    for (let index = 0; index < tables.length; index++) {
      let table = tables[index];
      let rows = table.rows;
      let sqlStatement =
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

        sqlStatement = sqlStatement + rowName + " " + rowType + final;
      }

      // Run the sql statement
      this.db.transaction((tx) => {
        tx.executeSql(sqlStatement, null, null, (txObj, error) =>
          console.log(error)
        );
      });
    }
  }

  delete() {
    this.db.transaction((tx) => {
      tx.executeSql(
        "", // Drop entire database
        null,
        null,
        (txObj, error) => console.log(error)
      );
    });
  }
}
