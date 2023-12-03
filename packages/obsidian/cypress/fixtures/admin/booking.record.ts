import { adminBookingPage } from "./booking.page";
import { adminCurrentDayRate, JetWashNVacuum } from "../../support/prices";

export const enterTheCustomerDetailsRecord = adminBookingPage.record({
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
});

export const addAValetServiceToTheBookingRecord = adminBookingPage.record({
  "Valet Services": "",
  a: () => {
    cy.field(adminBookingPage, "Jet Wash and Vacuum").trigger("click");
  },
});

export const addAWorkshopServiceToTheBookingRecord = adminBookingPage.record({
  "Workshop Services": "",
  a: () => {
    cy.field(adminBookingPage, "Lubricant Service").trigger("click");
  },
  "Current Mileage": "85000",
  "Work Requested": "The Quick Brown Fox Jumped Over The Lazy Dog",
});

export const viewThePriceOfTheBookingRecord = adminBookingPage.record({
  a: () => {
    const totalDaysCost = adminCurrentDayRate * 10;
    const addedExtra = JetWashNVacuum;
    const total = totalDaysCost + addedExtra;

    cy.contains(".ac-labelled-input", "Total Parking")
      .should("contain", String(totalDaysCost))
      .should("contain", String(addedExtra))
      .should("contain", String(total));
  },
  "Add Booking": "",
});

export const checkInABookingWithoutSpaceRecord = adminBookingPage.record({
  "Check In": "",
  "Manual Keyring Code": "",
  "Keyring Code": "123456",
  "Assign Keyring Code": "",
  "Continue without Parking": "",
  a: () => {
    cy.field(adminBookingPage, "Checked In Status").should("exist");
  },
});

export const moveACarRecord = adminBookingPage.record({
  "Move Car": "",
  "Override Parking Space": "",
  "Assign Space": "A-Row1-1",
  "Mark Car As Parked": "",
  Close: "",
  a: () => {
    cy.field(adminBookingPage, "Parked Status").should("exist");
  },
});

export const checkOutABookingRecord = adminBookingPage.record({
  "Check Out & Pay": "",
  Confirm: "",
  a: () => {
    cy.field(adminBookingPage, "Confirm").click();
    cy.field(adminBookingPage, "Checked Out Status").should("exist");
  },
});

export const validateActivityViewRecord = adminBookingPage.record({
  a: () => {
    cy.contains(
      ".ac-timeline-item__event",
      "Checked in with keyring code: 123456"
    ).should("exist");
    cy.contains(".ac-timeline-item__event", "Moved to space: A-1-1").should(
      "exist"
    );
    cy.contains(".ac-timeline-item__event", "Checked out").should("exist");
  },
});

export const createABookingWorkshopQuoteRecord = adminBookingPage.record({
  "Workshop Details": "",
  "Add Quote": "",
  Labour: "100",
  "Part Oil": "50",
  Tyres: "200",
  Fuel: "20",
  Exhaust: "300",
  "Third Party": "400",
  "Quote Total Price": "1070",
  a: () => {
    cy.field(adminBookingPage, "Add Quote").click();

    cy.contains("div", "Labour").next().should("contain", "100");
    cy.contains("div", "Parts/Oil").next().should("contain", "50");
    cy.contains("div", "Tyres").next().should("contain", "200");
    cy.contains("div", "Fuel").next().should("contain", "20");
    cy.contains("div", "Exhaust").next().should("contain", "300");
    cy.contains("div", "Third Party").next().should("contain", "400");
    cy.contains("div", "Total").next().should("contain", "1070");
  },
});

export const viewAndApproveTheBookingWorkshopQuoteRecord =
  adminBookingPage.record({
    a: () => {
      cy.contains("div", "Labour").next().should("contain", "100");
      cy.contains("div", "Parts/Oil").next().should("contain", "50");
      cy.contains("div", "Tyres").next().should("contain", "200");
      cy.contains("div", "Fuel").next().should("contain", "20");
      cy.contains("div", "Exhaust").next().should("contain", "300");
      cy.contains("div", "Third Party").next().should("contain", "400");
      cy.contains("div", "Total Price").next().should("contain", "1070");
      cy.contains(".c-button", "Approve").click();
    },
  });

export const viewTheCustomerWorkshopQuoteApprovalRecord =
  adminBookingPage.record({
    "Workshop Details": "",
    a: () => {
      cy.contains(".c-button", "Finalise Quote").should("exist");
      cy.contains(".c-button", "Finalise Quote").click();
      cy.contains(
        ".ac-timeline-item__event",
        "Workshop quote approved by customer"
      ).should("exist");
      cy.contains(".ac-timeline-item__event", "Quote was finalised").should(
        "exist"
      );
    },
  });
