import { PageObject, FieldType } from "@gcdtech/obsidian";

export const homePageObject = new PageObject({
  "Check In Date": { type: FieldType.date, get: "[name='arrivalTime']" },
  "Check In Time": { type: FieldType.date, get: "[name='arrivalTime.time']" },
  "Time Panel": { type: FieldType.text, get: ".rc-time-picker-panel-input" },
  "Check Out Date": { type: FieldType.date, get: "[name='departureTime']" },
  "Check Out Time": { type: FieldType.date, get: "[name='departureTime.time']" },
  "Find Parking": { type: FieldType.button, contains: { el: "button", filter: "Find Parking" } },
});
