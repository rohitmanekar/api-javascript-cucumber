Feature: Single Day's schedule for channel and metadata

    Scenario: Scenario 1 - Verify response status and response time
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then the response status code should be 200
        And the response time should be less than 1000 milliseconds

    Scenario: Scenario 2 - Validate ID and Type fields
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then the id field should never be null or empty
        And the type field in episode should always be "episode"

    Scenario: Scenario 3 - Validate Title field in episode
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then the title field in episode should never be null or empty for any schedule item

    Scenario: Scenario 4 - Validate that only one episode has live as true
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then only one episode in the list should have live as true

    Scenario: Scenario 5 - Validate transmission_start is before transmission_end
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then the transmission_start date should be before the transmission_end date

    Scenario: Scenario 6 - Validate Date header in response
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest"
        Then the response headers should contain a Date value

    Scenario: Scenario 7 - Validate 404 status code and error properties
        Given I make a GET request to "https://testapi.io/api/RMSTest/ibltest/2023-09-11"
        Then the HTTP status code should be 404
        And the error object should have properties details and http_response_code