/// <reference types="cypress" />

import { Context } from "@gcdtech/obsidian";

declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       *
       *
       * Generates a random value using an epoch timestamp, and assigns it to an alias
       *
       * Example: cy.generateRandomValueToAlias('forename', 'fore')
       * //Returns alias '@forename', value '1023423242-fore'
       *
       *
       * @aliasName {string} the name of the alias
       * @postfix {string} a string value to postfix to the end of the value.
       */
      generateRandomValueToAlias(aliasName: string): Chainable<Element>;
    }
  }
}

Cypress.Commands.add("generateRandomValueToAlias", (aliasName: string) => {
  cy.wrap(Math.floor(new Date().getTime() / 1000).toString()).as(aliasName);
});

export {};
