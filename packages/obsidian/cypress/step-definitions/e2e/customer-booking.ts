import { camelise, Context, Then, When } from "@gcdtech/obsidian";
import { bookingPageObject } from "../../fixtures/customer/booking.page";
import * as bookingRecords from "../../fixtures/customer/booking.record";
import { homePageObject } from "../../fixtures/customer/homepage.page";

When("I set the arrival and departure time", () => {
  const today = new Date();
  today.setHours(12);
  today.setMinutes(0);

  const todaysDateFormatted = today.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const todaysTimeFormatted = today.toLocaleString("en-gb", {
    hour: "numeric",
    minute: "numeric",
  });

  cy.field(homePageObject, "Check In Date").clear().type(todaysDateFormatted);
  cy.get(".p-hero__graphic > img").click({ force: true }); // Dismiss the date picker dialog
  cy.field(homePageObject, "Check In Time").click();
  cy.field(homePageObject, "Time Panel").clear().type(todaysTimeFormatted);

  const sevenDaysFromNow = new Date(today);
  sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

  const sevenDaysFormatted = sevenDaysFromNow.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const sevenTimeFormatted = sevenDaysFromNow.toLocaleString("en-gb", {
    hour: "numeric",
    minute: "numeric",
  });
  Context.add("todaysDate", today);
  Context.add("sevenDaysFromNow", sevenDaysFromNow);

  cy.field(homePageObject, "Check Out Date").clear().type(sevenDaysFormatted);
  cy.get(".p-hero__graphic > img").click({ force: true }); // Dismiss the date picker dialog
  cy.field(homePageObject, "Check Out Time").click();
  cy.field(homePageObject, "Time Panel").clear().type(sevenTimeFormatted);
  cy.get(".p-hero__graphic > img").click({ force: true }); // Dismiss the date picker dialog
});

Then("I can see that the times are set", () => {
  const todaysDate = new Date(Context.get("todaysDate"));
  const sevenDaysFromNow = new Date(Context.get("sevenDaysFromNow"));

  const todaysDateFormatted = todaysDate.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  const sevenDaysFormatted = sevenDaysFromNow.toLocaleString("en-gb", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const todaysTimeFormatted = todaysDate.toLocaleString("en-gb", {
    hour: "numeric",
    minute: "numeric",
  });
  const sevenTimeFormatted = sevenDaysFromNow.toLocaleString("en-gb", {
    hour: "numeric",
    minute: "numeric",
  });

  cy.field(bookingPageObject, "Vehicle Arrival").should(
    "contain",
    todaysDateFormatted
  );
  cy.field(bookingPageObject, "Vehicle Departure").should(
    "contain",
    sevenDaysFormatted
  );
  cy.field(bookingPageObject, "Vehicle Arrival Time").should(
    "contain",
    todaysTimeFormatted
  );
  cy.field(bookingPageObject, "Vehicle Departure Time").should(
    "contain",
    sevenTimeFormatted
  );
});

When('I enter "{}" record', (recordName: string) => {
  cy.record(bookingRecords[camelise(recordName) + "Record"], "enter");
});

Then("I can see the booking extra screen", () => {
  cy.url().should("contain", "extra");
});

Then("I can see the booking confirmation screen", () => {
  cy.url().should("contain", "confirmation");
});
