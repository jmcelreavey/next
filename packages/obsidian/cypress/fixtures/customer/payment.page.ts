import { FieldType, PageObject } from "@gcdtech/obsidian";

export const paymentPageObject = new PageObject({
  "Pay Now": {
    type: FieldType.button,
    contains: { el: "button", filter: "Pay Now" },
  },
  "Mock Payment Success": {
    type: FieldType.button,
    contains: { el: "button", filter: "Mock Payment Success" },
  },
  "Mock Payment Failure": {
    type: FieldType.button,
    contains: { el: "button", filter: "Mock Payment Failure" },
  },
});
