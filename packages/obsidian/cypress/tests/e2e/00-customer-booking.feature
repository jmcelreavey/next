Feature: E2E Customer Booking Flow

	@passing
	Scenario: [System] - Reset data
		Given I have freshly seeded data
        When On customer I navigate to /

    @passing @MCC-5 @johnny
    Scenario: [MCC-5] I can input arrival/return on form
        And I "enter the time and dates and click Find Parking" via the "Booking Record" screen
 
    @passing @MCC-6 @matthew
    Scenario: [MCC-6] I can input person details to booking & submit
        And I "enter the customer details" via the "Booking Record" screen

    @passing @MCC-241 @conor
    Scenario: [MCC-241] I can add Valet Services to my order
        And I "add a valet service to the booking" via the "Booking Record" screen

    @passing @MCC-365 @conor 
    Scenario: [MCC-365] I can add Workshop Services to my order
        And I "add a workshop service to the booking" via the "Booking Record" screen

    @passing @MCC-7 @conor
    Scenario: [MCC-7] I can view the booking summary page
        Then I "see the booking summary" via the "Booking Record" screen

    @passing @MCC-230 @conor
    Scenario: [MCC-230] I can pay for a booking
       And I "mock pay for my booking via card" via the "Booking Record" screen

    @passing @MCC-8 @conor
    Scenario: [MCC-8] I can see the booking confirmation screen
        Then I "see the booking confirmation" via the "Booking Record" screen
