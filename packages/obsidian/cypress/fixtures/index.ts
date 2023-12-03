// Import Page Objects here - example:
import { bookingPageObject as customerBookingPage } from "./customer/booking.page";
import {
  homePageObject as adminHomePage,
  homePageObject as customerHomePage,
} from "./customer/homepage.page";
import { adminBookingPage } from "./admin/booking.page";

export const pageObjectImports = {
  customer: {
    homepage: customerHomePage,
    booking: customerBookingPage,
  },
  admin: {
    homepage: adminHomePage,
    booking: adminBookingPage,
  },
};

import * as bookingRecord from "./customer/booking.record";
import * as adminBookingRecord from "./admin/booking.record";

export const pageRecordImports = {
  "Booking Record": bookingRecord,
  "Admin Booking Record": adminBookingRecord,
};

export const userList = {
  admin: {
    username: "aadmin",
  },
};
