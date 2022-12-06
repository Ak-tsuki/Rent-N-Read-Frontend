Feature: Accept and Reject Exchange Request

    As a BookOwner I should be able to accept and reject exchange request which are in pending exchange request

    Scenario: As an BookOwner I can Accept exchange request
        Given I am on the "exchangerequest" page
        When I click the "btn-accept" button
        Then I should see "Accept success" message

    Scenario: As an BookOwner I can Reject exchange request to see the reject sucesss toast message
        Given I am on the "exchangerequest" page
        And I click the "btn-reject" button
        And I should see "reject-modal" modal
        When I click the "yes-btn" button
        Then I should see "Reject success" message

