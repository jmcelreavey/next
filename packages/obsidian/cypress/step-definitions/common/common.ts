import { pageObjectImports } from "../../fixtures";
import { pageRecordImports } from '../../fixtures';
import { Given, camelise, Then } from "@gcdtech/obsidian";

Given('I click on "{}" from "{}" "{}"', (fieldName: string, page: string, pageObject: string) => {
  cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName).click({
    force: true,
  });
});

Given(
  'I select "{}" on dropdown "{}" from "{}" "{}"',
  (select: string, fieldName: string, page: string, pageObject: string) => {
    cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName)
      .next()
      .selectDropdown(select);
  }
);

Given(
  'I enter "{}" in to "{}" from "{}" "{}"',
  (inputText: string, fieldName: string, page: string, pageObject: string) => {
    cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName).type(inputText);
  }
);

Given(
  'I clear the input for "{}" from "{}" "{}"',
  (fieldName: string, page: string, pageObject: string) => {
    cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName).clear();
  }
);

Given(
  'I can see "{}" from "{}" "{}" exists',
  (fieldName: string, page: string, pageObject: string) => {
    cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName).should("exist");
  }
);

Given(
  'I can see "{}" from "{}" "{}" does not exist',
  (fieldName: string, page: string, pageObject: string) => {
    cy.field(pageObjectImports[camelise(page)][camelise(pageObject)], fieldName).should(
      "not.exist"
    );
  }
);

Given(
  `I "{}" via the "{}" screen`,
  (recordName: string, recordFile: string) => {
      console.log(camelise(recordName) + 'Record')
      console.log(recordFile)
    cy.record(
      pageRecordImports[recordFile][camelise(recordName) + 'Record'],
      'enter'
    );
  }
);

Then('I can confirm the booking as been {}', () => {
   
})