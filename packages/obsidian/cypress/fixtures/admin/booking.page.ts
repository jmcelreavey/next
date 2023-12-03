import { FieldType, PageObject } from "@gcdtech/obsidian";

export const adminBookingPage = new PageObject({
  "Add New Booking": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Add New Booking" },
  },
  Forename: { type: FieldType.text, get: "[name='user.forename']" },
  Surname: { type: FieldType.text, get: "[name='user.surname']" },
  Email: { type: FieldType.text, get: "[name='user.email']" },
  Phone: { type: FieldType.text, get: "[name='user.phone']" },
  "Travel Destination": {
    type: FieldType.text,
    get: "[name='travelDestination']",
  },
  "Flight Number": { type: FieldType.text, get: "[name='flightNumber']" },
  Registration: { type: FieldType.text, get: "[name='car.registration']" },
  "Vehicle Make": { type: FieldType.text, get: "[name='car.make']" },
  "Vehicle Model": { type: FieldType.text, get: "[name='car.model']" },
  "Vehicle Colour": { type: FieldType.text, get: "[name='car.color']" },
  "Flight Number Select": {
    type: FieldType.button,
    get: ".ac-listbox__item",
  },
  "Add Booking": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Add Booking" },
  },
  Confirm: {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Confirm" },
  },

  Booking: { type: FieldType.text, xpath: "(//tr[@class='c-table__row'])[2]" },
  "Check In": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Confirm & Check In" },
  },
  "Manual Keyring Code": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Enter code manually" },
  },
  "Keyring Code": { type: FieldType.text, get: "[name='keyringCode']" },
  "Assign Keyring Code": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Assign & Link Key" },
  },
  "Continue without Parking": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Continue without parking" },
  },
  "Move Car": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Move Car" },
  },
  "Override Parking Space": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Override Parking Space" },
  },
  "Assign Space": { type: FieldType.select, get: "[id='spaceSelect']" },
  "Mark Car As Parked": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Mark Car As Parked" },
  },
  Close: {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Close" },
  },
  "Check Out & Pay": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Check Out & Pay" },
  },

  // Pill Statuses
  "Checked In Status": {
    type: FieldType.text,
    contains: { el: ".c-pill", filter: "Checked In" },
  },
  "Checked Out Status": {
    type: FieldType.text,
    contains: { el: ".c-pill", filter: "Checked Out" },
  },
  "Parked Status": {
    type: FieldType.text,
    contains: { el: ".c-pill", filter: "Parked" },
  },

  //Extras - Valet
  "Valet Services": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Valet Services" },
  },
  "Workshop Services": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Workshop Services" },
  },
  "Jet Wash and Vacuum": {
    type: FieldType.button,
    within: {
      parent: {
        contains: { el: ".p-package-card", filter: "Jet Wash ‘n’ Vacuum" },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Handwash & Wax": {
    type: FieldType.button,
    within: {
      parent: {
        contains: { el: ".p-package-card", filter: "Handwash & Wax" },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Interior Steam Clean": {
    type: FieldType.button,
    within: {
      parent: {
        contains: { el: ".p-package-card", filter: "Interior Steam Clean" },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Complete Valet Special": {
    type: FieldType.button,
    within: {
      parent: {
        contains: { el: ".p-package-card", filter: "Complete Valet Special" },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Buffing Service - Handwash & Wax": {
    type: FieldType.button,
    within: {
      parent: {
        contains: {
          el: ".p-package-card",
          filter: "Buffing Service - Handwash & Wax",
        },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },

  // Extras - Workshop
  "Lubricant Service": {
    type: FieldType.button,
    within: {
      parent: {
        contains: {
          el: ".p-package-card",
          filter: "Lubricant Service",
        },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Standard Service Labour": {
    type: FieldType.button,
    within: {
      parent: {
        contains: {
          el: ".p-package-card",
          filter: "Standard Service Labour",
        },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Additional Services (Hourly Rate)": {
    type: FieldType.button,
    within: {
      parent: {
        contains: {
          el: ".p-package-card",
          filter: "Additional Services (Hourly Rate)",
        },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },

  "Current Mileage": {
    type: FieldType.text,
    get: "[name='currentMileage']",
  },
  "Work Requested": {
    type: FieldType.text,
    get: "[name='workRequested']",
  },

  // Workshop Details
  "Workshop Details": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Workshop Details" },
  },
  "Add Quote": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Add Quote" },
  },
  Labour: { type: FieldType.text, get: "[name='labour']" },
  "Part Oil": { type: FieldType.text, get: "[name='partOil']" },
  Tyres: { type: FieldType.text, get: "[name='tyres']" },
  Fuel: { type: FieldType.text, get: "[name='fuel']" },
  Exhaust: { type: FieldType.text, get: "[name='exhaust']" },
  "Third Party": { type: FieldType.text, get: "[name='thirdParty']" },
  "Quote Total Price": {
    type: FieldType.text,
    get: "[name='quoteTotalPrice']",
  },
});
