Feature: E2E Admin Booking Check-in/Check-out Flow

    @passing
	Scenario: [System] - Set up
        Given On cpms I navigate to /bookings
        And I click on "Booking" from "Admin" "Booking"

    @passing @MCC-14 @rupert
    Scenario: [MCC-14] I can check in a booking
        When I "check in a booking without space" via the "Admin Booking Record" screen

    @passing @MCC-16 @rupert
    Scenario: [MCC-16] I can move a car on a booking
        And I "move a car" via the "Admin Booking Record" screen

    @passing @MCC-20 @conor
    Scenario: [MCC-20] I can check out a booking
        And I "check out a booking" via the "Admin Booking Record" screen

    @passing @MCC-27 @matthew
    Scenario: [MCC-27] I can view the activity for the booking
        Then I "validate activity view" via the "Admin Booking Record" screen