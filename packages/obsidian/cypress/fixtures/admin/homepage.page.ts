import { PageObject, FieldType } from "@gcdtech/obsidian";

export const homePageObject = new PageObject({
  "Sign in": {
    type: FieldType.button,
    contains: { el: "button", filter: "Sign in" },
  },
  Email: { type: FieldType.text, get: "[name='email']" },
  Pin: { type: FieldType.text, get: "[name='pin']" },
  "Sign in with credentials": {
    type: FieldType.button,
    contains: { el: "button", filter: "Sign in with credentials" },
  },
});
