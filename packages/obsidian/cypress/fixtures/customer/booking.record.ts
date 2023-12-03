import dayjs from "dayjs";
import {
  sevenDaysFormatted,
  sevenTimeFormatted,
  todaysDateFormatted,
  todaysTimeFormatted,
} from "../../support/dateUtils";
import { JetWashNVacuum, currentDayRate } from "../../support/prices";
import { bookingPageObject } from "./booking.page";

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export const customerDetailsRecord = bookingPageObject.record({
  Registration: "ABC123",
  "Travel Destination": "London",
  "Flight Number": "BA123",
  "Vehicle Make": "Ford",
  "Vehicle Model": "Focus",
  "Vehicle Colour": "Blue",
  Forename: "John",
  Surname: "Doe",
  Email: "john.doe@test.com",
  Phone: "01234567890",
});

export const enterTheTimeAndDatesAndClickFindParkingRecord =
  bookingPageObject.record({
    "Fill out booking form": () => {
      cy.field(bookingPageObject, "Vehicle Arrival")
        .clear()
        .type(todaysDateFormatted);
      cy.field(bookingPageObject, "Vehicle Departure")
        .clear()
        .type(sevenDaysFormatted);
      cy.get(".p-hero__graphic > img").click({ force: true });
      cy.field(bookingPageObject, "Vehicle Arrival Time").click();
      cy.xpath("(//input[@class='rc-time-picker-panel-input'])[1]")
        .clear()
        .type(todaysTimeFormatted);
      cy.field(bookingPageObject, "Vehicle Departure Time").click();
      cy.xpath("(//input[@class='rc-time-picker-panel-input'])[1]")
        .clear()
        .type(sevenTimeFormatted);
      cy.get(".p-hero__graphic > img").click({ force: true });
      cy.field(bookingPageObject, "Find Parking").click();
      cy.wait(500);
    },
  });

export const enterTheCustomerDetailsRecord = bookingPageObject.record({
  Forename: "John",
  Surname: "Doe",
  Email: "john.doe@test.com",
  Phone: "01234567890",
  Registration: "ABC123",
  "Vehicle Make": "Ford",
  "Vehicle Model": "Focus",
  "Vehicle Colour": "Blue",
  "Travel Destination": "London",
  "Flight Number": "DD123",
  "Flight Number Select": "",
  "Continue to extras": "",
});

export const addAValetServiceToTheBookingRecord = bookingPageObject.record({
  a: () => {
    cy.field(bookingPageObject, "Jet Wash and Vacuum").trigger("click");
  },
});

export const addAWorkshopServiceToTheBookingRecord = bookingPageObject.record({
  a: () => {
    cy.field(bookingPageObject, "Lubricant Service").trigger("click");
  },
  "Current Mileage": "85000",
  "Work Requested": "The Quick Brown Fox Jumped Over The Lazy Dog",
  "Continue to payment": "",
});

export const mockPayForMyBookingViaCardRecord = bookingPageObject.record({
  a: () => {
    cy.wait(3000);
  },
  "Pay by card": "",
  b: () => {
    cy.wait(3000);
  },
  "Mock Pay Success": "",
});

export const seeTheBookingConfirmationRecord = bookingPageObject.record({
  "Confirm successful booking": () => {
    const arrivalFormattedDate = dayjs(todaysDateFormatted, "D/M/YYYY");
    const arrivalDate = arrivalFormattedDate.format("DD MMMM YYYY");
    const departureFormattedDate = dayjs(sevenDaysFormatted, "D/M/YYYY");
    const departureDate = departureFormattedDate.format("DD MMMM YYYY");
    const totalDaysCost = currentDayRate * 7;
    const addedExtra = JetWashNVacuum;
    const total = totalDaysCost + addedExtra;
    const totalString = total.toString();

    cy.contains(".c-heading", "Booking confirmed!").should("exist");
    cy.contains(".ac-key-pair", "Check In Time")
      .should("contain", arrivalDate)
      .should("contain", todaysTimeFormatted);
    cy.contains(".ac-key-pair", "Departure Time")
      .should("contain", departureDate)
      .should("contain", sevenTimeFormatted);
    cy.contains(".ac-key-pair", "Total Cost").should("contain", totalString);
  },
});

export const seeTheBookingSummaryRecord = bookingPageObject.record({
  "Confirm summary booking": () => {
    cy.contains("div", "Jet Wash ‘n’ Vacuum")
      .next()
      .should("contain", "£22.00");
    cy.contains("div", "Lubricant Service")
      .next()
      .should("contain", "Pay on collection");
  },
});
