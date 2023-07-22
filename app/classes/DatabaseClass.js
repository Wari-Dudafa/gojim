import * as sqlite from "expo-sqlite";

export default class Database {
  constructor() {
    this.db = sqlite.openDatabase("fitone.db");
    this.tables = [
      {
        name: "exercises",
        rows: [
          { rowName: "name", rowType: "TEXT" },
          { rowName: "reps", rowType: "INTEGER" },
          { rowName: "sets", rowType: "INTEGER" },
        ],
      },
    ];
  }

  init(errorCallback) {
    // Initialise all tables required for the application
    for (let index = 0; index < this.tables.length; index++) {
      let table = this.tables[index];
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
          errorCallback(error)
        );
      });
    }
  }

  wipeDatabase(errorCallback) {
    // Drops all tables
    this.db.transaction((tx) => {
      tx.executeSql(
        "", // Drop entire database
        null,
        null,
        (txObj, error) => errorCallback(error)
      );
    });
  }

  sql(statement, callback, errorCallback) {
    this.db.transaction((tx) => {
      tx.executeSql(
        statement,
        null,
        (txObj, resultSet) => callback(resultSet),
        (txObj, error) => errorCallback(error)
      );
    });
  }
}
