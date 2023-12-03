/* eslint-disable no-undef */
/// <reference types="cypress" />
/// <reference types="node" />

const fs = require("fs-extra");
import child_process from "child_process";

import path from "path";

module.exports = async (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on("task", {
    queryTestDb: (command) => {
      return queryTestDb(command, config);
    },
    truncateTestDb: () => {
      return truncateTestDb(config);
    },
  });

  on("after:run", async () => {
    const messages = await fs.promises.open(
      path.join(path.resolve(config.projectRoot), "cucumber-messages.ndjson"),
      "r"
    );
    try {
      const json = await fs.promises.open(
        path.join(path.resolve(config.projectRoot), "artefacts/.run/report.json"),
        "w"
      );
      try {
        const child = child_process.spawn("cucumber-json-formatter", {
          stdio: [messages.fd, json.fd, "inherit"],
        });
        await new Promise<void>((resolve, reject) => {
          child.on("exit", (code) => {
            if (code === 0) {
              resolve();
            } else {
              reject(new Error(`${"formatter"} exited non-successfully`));
            }
          });
        });
      } finally {
        await json.close();
      }
    } finally {
      await messages.close();
    }
  });
};

const mysql = require("mysql2");

function queryTestDb(query, config) {
  const connection = mysql.createConnection(config.env.mysql);

  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) {
        return reject(error);
      } else {
        connection.end();
        return resolve(results);
      }
    });
  });
}

function truncateTestDb(config) {
  const connection = mysql.createConnection(config.env.mysql);

  // start connection to db
  connection.connect();
  // exec query + disconnect to db as a Promise
  return new Promise((resolve, reject) => {
    //Turn off foreign key checks
    connection.query("SET FOREIGN_KEY_CHECKS = 0;");

    //Returns a `TRUNCATE TABLE db.tablename` for each table in the DB
    connection.query(
      "SELECT @str := CONCAT('TRUNCATE TABLE ', table_schema, '.', table_name, ';') FROM   information_schema.tables WHERE  table_type   = 'BASE TABLE' AND  table_schema IN ('docker');",
      (error, results: Array<String>) => {
        if (error) {
          return reject(error);
        } else {
          results.forEach((result) => {
            connection.query(
              result["@str := CONCAT('TRUNCATE TABLE ', table_schema, '.', table_name, ';')"],
              (error, result) => {
                return resolve(result);
              }
            );
          });
        }
      }
    );
  });
}
