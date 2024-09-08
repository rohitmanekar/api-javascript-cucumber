@ignore
Feature: BBC One London Broadcast Schedule

    Scenario: Verify channel details are accurate
        Given the channel details are available
        When I check the channel information
        Then I should see the channel ID as "bbc_one_london"
        And I should see the channel title as "BBC One"
        And the channel should have a schedule

    Scenario: Verify first scheduled program details
        Given the schedule is available
        When I check the first scheduled program
        Then I should see the title of the program as "Breakfast"
        And the scheduled start time should be "2023-09-11T05:00:00.000Z"

    Scenario: Check events recorded for a program
        Given I have the program "Expert Witness" scheduled
        When I check the events for this program
        Then the program should have events for "started" and "ended"

    Scenario: Verify requirements for watching a program
        Given I have the program "Homes Under the Hammer"
        When I check the program requirements
        Then I should see that it requires a TV licence
        And should require sign-in
        And it should be restricted to audiences of age "u13", "u16", "u18", "o18"

    Scenario: Verify response for a non-existent endpoint
        Given the API endpoint "https://testapi.io/api/RMSTest/ibltest/2023-09-111" is queried
        When the response status code is received
        Then the response status code should be 404
        And the response body should contain "Endpoint not found"
