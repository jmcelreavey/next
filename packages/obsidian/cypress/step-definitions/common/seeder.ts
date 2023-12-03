import { Given } from "@gcdtech/obsidian";

Given(`I have freshly seeded data`, () => {
  cy.restoreTestDatabase();
});
