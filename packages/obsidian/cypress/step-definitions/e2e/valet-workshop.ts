import { camelise, Context, Then, When, Given } from "@gcdtech/obsidian";
import { homePageObject } from "../../fixtures/customer/homepage.page";

Given("I am on the booking extra screen for booking '{}'", (bookingID) => {
  const url = `/booking/${bookingID}/extra`;

  // Navigate to the constructed URL
  cy.visit(url);
});
