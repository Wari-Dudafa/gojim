import * as sqlite from "expo-sqlite";

type table = {
  name: string;
  rows: row[];
};

type row = {
  name: string;
  type: string;
};

export default class Database {
  private static db: sqlite.Database = sqlite.openDatabase("gojim.db");
  private static tables: table[] = [
    // They all have an incrementing id as a primary key
    {
      name: "workouts",
      rows: [{ name: "name", type: "TEXT" }],
    },
    {
      name: "exercises",
      rows: [
        { name: "name", type: "TEXT" },
        { name: "timed", type: "INTEGER" },
        { name: "workout_id", type: "INTEGER" },
      ],
    },
  ];

  static runSQL(statement: string): Promise<sqlite.SQLResultSet> {
    return new Promise((resolve, reject) => {
      this.db.transaction((tx) => {
        tx.executeSql(
          statement,
          null,
          (_txObj, resultSet) => {
            resolve(resultSet);
          },
          (_txObj, error) => {
            this.init();
            reject(error);
            console.error("SQL error: ", error);
            // Returning true would typically roll back the transaction
            // Returning false would proceed with the transaction as if the error did not occur
            return false;
          }
        );
      });
    });
  }

  static init(): void {
    // Loop over tables and add them to the database if the dont already exist
    for (let index = 0; index < this.tables.length; index++) {
      let table = this.tables[index];
      this.makeTable(table);
    }
  }

  static makeTable(table: table): void {
    let statement = `CREATE TABLE IF NOT EXISTS ${table.name} (id INTEGER PRIMARY KEY AUTOINCREMENT, `;

    for (let index = 0; index < table.rows.length; index++) {
      let final: string;
      let row: row = table.rows[index];
      let rowName: string = row.name;
      let rowType: string = row.type;

      if (index == table.rows.length - 1) {
        final = ")";
      } else {
        final = ", ";
      }

      statement = `${statement}${rowName} ${rowType}${final}`;
    }

    this.runSQL(statement);
  }

  static deleteAllData(): void {
    for (let index = 0; index < this.tables.length; index++) {
      let table = this.tables[index];
      this.deleteTable(table);
    }
  }

  static deleteTable(table: table): void {
    let statement: string = `DROP TABLE IF EXISTS ${table.name}`;
    this.runSQL(statement);
  }
}
