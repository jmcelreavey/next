import { Then } from "@gcdtech/obsidian";

Then('I can view the "{}" button', (buttonText: string) => {
  cy.contains("button", buttonText).should("exist");
});
