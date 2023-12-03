// enables intelligent code completion for Cypress commands
// https://on.cypress.io/intelligent-code-completion
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     *
     * Locates an accordian based on its title.
     */
    morseLocateAccordian: (accordianTitle: string) => Chainable<JQuery<HTMLElement>>;

    /**
     * Chaining command, requires `morseLocateAccordian` to provide an accordian DOM
     * element.
     *
     *
     */
    morseActivateAccordian: (subject?: JQuery<HTMLElement>) => Chainable<JQuery<HTMLElement>>;
  }
}

Cypress.Commands.add("morseLocateAccordian", (accordianTitle: string) => {
  return cy.get(".cc-accordion__item", { timeout: 3000 }).contains(accordianTitle);
});

Cypress.Commands.add(
  "morseActivateAccordian",
  { prevSubject: true },
  (subject?: JQuery<HTMLElement>) => {
    //determine if the accordian is already active, if so, forward the subject without doing anything
    if (Cypress.$(subject).parent().hasClass("cc-accordion__item +active") == true) {
      return cy.wrap(subject);
    } else {
      return cy.wrap(subject).click();
    }
  }
);
