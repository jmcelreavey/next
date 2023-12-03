import { FieldType, PageObject } from "@gcdtech/obsidian";

export const bookingPageObject = new PageObject({
  "Vehicle Arrival": {
    type: FieldType.date,
    //next: { contains: { el: "div", filter: "Entry date" } },
    get: "[id='arrivalTime']",
  },
  "Vehicle Departure": {
    type: FieldType.date,
    get: "[id='departureTime']",
  },
  "Vehicle Arrival Time": {
    type: FieldType.text,
    get: "[name='arrivalTime.time']",
  },
  "Vehicle Departure Time": {
    type: FieldType.text,
    get: "[name='departureTime.time']",
  },
  "Find Parking": {
    type: FieldType.button,
    get: "[type='submit']",
  },

  //Customer Details
  Registration: { type: FieldType.text, get: "[name='registration']" },
  "Travel Destination": {
    type: FieldType.text,
    get: "[name='travelDestination']",
  },
  "Flight Number": { type: FieldType.text, get: "[name='flightNumber']" },
  "Flight Number Select": {
    type: FieldType.button,
    get: ".ac-listbox__item",
  },
  "Vehicle Make": { type: FieldType.text, get: "[name='make']" },
  "Vehicle Model": { type: FieldType.text, get: "[name='model']" },
  "Vehicle Colour": { type: FieldType.text, get: "[name='color']" },
  Forename: { type: FieldType.text, get: "[name='forename']" },
  Surname: { type: FieldType.text, get: "[name='surname']" },
  Email: { type: FieldType.text, get: "[name='email']" },
  Phone: { type: FieldType.text, get: "[name='phone']" },
  Continue: {
    type: FieldType.button,
    contains: { el: "button", filter: "Continue" },
  },
  "Continue to extras": {
    type: FieldType.button,
    get: "[type='submit']",
  },
  "Customer Details - Cancel": {
    type: FieldType.button,
    contains: { el: "button", filter: "Cancel" },
  },

  //Extras - Valet
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
        contains: { el: ".p-package-card", filter: "Lubricant Service" },
      },
      child: { contains: { el: ".c-button", filter: "Add to booking" } },
    },
  },
  "Standard Service Labour": {
    type: FieldType.button,
    within: {
      parent: {
        contains: { el: ".p-package-card", filter: "Standard Service Labour" },
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

  "Continue to payment": {
    type: FieldType.button,
    get: "[type='submit']",
  },
  "Extras - Cancel": {
    type: FieldType.button,
    contains: { el: "button", filter: "Cancel" },
  },

  // Payment
  "Pay by card": {
    type: FieldType.button,
    contains: { el: ".c-button", filter: "Submit & Pay" },
  },
  "Pay with Google": {
    type: FieldType.button,
    get: "[aria-label='Pay with GPay']",
  },

  // Pay By Card
  "Card Number": {
    type: FieldType.text,
    get: "[name='card_number']",
  },
  "Card Name": {
    type: FieldType.text,
    get: "[name='cardholder_name']",
  },
  "Expiry Date": {
    type: FieldType.text,
    get: "[name='expiration_date']",
  },
  CVC: {
    type: FieldType.text,
    get: "[name='security_code']",
  },

  // Mock Payment
  "Mock Pay Success": {
    type: FieldType.button,
    contains: { el: "button", filter: "Mock Payment Success" },
  },
  "Mock Pay Failure": {
    type: FieldType.button,
    contains: { el: "button", filter: "Mock Payment Failure" },
  },

  // Booking Confirmation
});
