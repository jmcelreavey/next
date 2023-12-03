/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      restoreTestDatabase: () => boolean;
      snapshotTestDatabase: () => boolean;
      obsAssertRowExistsInTestDatabase: (options: {
        table: string;
        filter: string;
        isUnique?: boolean;
      }) => void;
    }
  }
}

Cypress.Commands.add("snapshotTestDatabase", () => {
  cy.log("**Restoring test database to starting point**");
  cy.exec("echo `git -C '../' rev-parse HEAD`");

  const docker_db_container = Cypress.env("docker_db_container");
  const IS_CI = Cypress.env("IS_CI");

  let command =
    "docker exec -t " +
    docker_db_container +
    " /usr/bin/mysqldump -u docker --no-tablespaces --password=docker docker | grep -v '\\[Warning\\].*' > `git -C '../' rev-parse HEAD`-snapshot.sql";
  if (IS_CI) {
    command =
      "mysqldump -h mysql -u docker --no-tablespaces --password=docker docker | grep -v '\\[Warning\\].*' > `git -C '../' rev-parse HEAD`-snapshot.sql";
  }

  cy.exec(command).then((result) => {
    cy.log("Snapshotting database");
    cy.log(JSON.stringify(result));
  });
});

Cypress.Commands.add("restoreTestDatabase", () => {
  cy.log("**Restoring test database to starting point**");

  const docker_db_container = Cypress.env("docker_db_container");
  const IS_CI = Cypress.env("IS_CI");

  let command =
    "cat `git -C '../' rev-parse HEAD`-snapshot.sql | docker exec -i  " +
    docker_db_container +
    " /usr/bin/mysql -u docker --password=docker docker";

  if (IS_CI) {
    command =
      "cat `git -C '../' rev-parse HEAD`-snapshot.sql | mysql -h mysql -u docker --password=docker docker";
  }

  cy.exec(command).then((result) => {
    console.log("restoring database");
    console.log(JSON.stringify(result));
  });
});

Cypress.Commands.add(
  "obsAssertRowExistsInTestDatabase",
  (options: { table: string; filter: string; isUnique?: boolean }) => {
    if (typeof options.isUnique == "undefined") options.isUnique = false;

    cy.task(
      "queryTestDb",
      "SELECT COUNT(*) AS Count FROM " + options.table + " WHERE " + options.filter
    ).then((result) => {
      const count = parseInt(result[0]["Count"]);
      if (options.isUnique) {
        expect(count).to.equal(1);
      } else {
        expect(count).to.be.greaterThan(1);
      }
    });
  }
);

export {};
