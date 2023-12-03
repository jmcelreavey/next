import { PageObject, PageRecord, FieldType } from "@gcdtech/obsidian";

export const placeholderPageObject = new PageObject({
  // Place Page Mappings here - example:
  // "Forename": { type: FieldType.text, get: "[id='Forename']" },
  // "Surname": { type: FieldType.text, get: "[id='Surname']" },
  // "Create Button": { type: FieldType.button, contains: { el: ".c-button", filter: "Create" } },
});

export const placeholderRecord = placeholderPageObject.record({
  // Place Record Data here - example:
  // "Forename": "John",
  // "Surname": "Doe",
  // "Create Button": "",
});
