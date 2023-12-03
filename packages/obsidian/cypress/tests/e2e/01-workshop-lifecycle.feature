Feature: E2E Valet & Workshop Flow

	@passing
	Scenario: [System] - Set up
        Given I log in to Admin
		When On cpms I navigate to /bookings
        And I click on "Booking" from "Admin" "Booking"

    @passing @MCC-366 @rupert
    Scenario: [MCC-366] I can create a booking workshop quote
        And I "create a booking workshop quote" via the "Admin Booking Record" screen

    @passing @MCC-377 @matthew
    Scenario: [MCC-377] I can approve the quote
        When On customer I navigate to /booking/1/quote
        And I "view and approve the booking workshop quote" via the "Admin Booking Record" screen

    @passing @MCC-377 @matthew
    Scenario: [MCC-377] I can view the customer approval
        And On cpms I navigate to /bookings
        When I click on "Booking" from "Admin" "Booking"
        Then I "view the customer workshop quote approval" via the "Admin Booking Record" screen