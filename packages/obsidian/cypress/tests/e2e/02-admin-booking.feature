Feature: E2E Admin Booking Flow

	@passing
	Scenario: [System] - Reset data
		Given I have freshly seeded data
        And On cpms I navigate to /bookings
        And I click on "Add New Booking" from "Admin" "Booking"
 
    @passing @MCC-6 @matthew
    Scenario: [MCC-6] I can input person details to booking & submit
        And I "enter the customer details" via the "Admin Booking Record" screen

    @passing @MCC-241 @conor
    Scenario: [MCC-241] I can add Valet Services to my order
        And I "add a valet service to the booking" via the "Admin Booking Record" screen

    @passing @MCC-365 @conor 
    Scenario: [MCC-365] I can add Workshop Services to my order
        And I "add a workshop service to the booking" via the "Admin Booking Record" screen

    @passing @conor
    Scenario: [MCC-???] I can view the price of the booking
        And I "view the price of the booking" via the "Admin Booking Record" screen