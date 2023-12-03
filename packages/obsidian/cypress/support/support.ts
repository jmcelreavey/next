import "./helpers";
import "./morse-accordian-actions";
import "cypress-mailosaur";
import "./obsidian-database";

before(() => {
  //Disables 'Request Aborted' exceptions.
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  cy.exec("ls `git -C '../' rev-parse HEAD`-snapshot.sql", {
    failOnNonZeroExit: false,
  }).then((result) => {
    if (result.stdout) {
      //A snapshot matching the current revision exists, suggesting no need to re-seed
      cy.log("As you are still on the same git revision, we're skipping seeding. ");
    } else if (result.stderr) {
      //The head is different from the snapshot, or no snapshot exists, re-seed and snapshot.
      cy.log("Your project has changed, a fresh snapshot will be generated");

      cy.task("truncateTestDb").then(() => {
        //Cooloff
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(800, { log: false });

        //Seed Essentials
        cy.exec("cd ../../ && yarn db:seed").then((result) => {
          cy.log("Seed completed");
          cy.wait(500, { log: false });
          cy.snapshotTestDatabase();
        });
      });
    }
  });
});

Cypress.Screenshot.defaults({
  onAfterScreenshot($el, props) {
    console.log(JSON.stringify(props));
  },
});

export {};
