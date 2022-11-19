Feature: Approve and Reject Book

    As a Admin I should be able to approve and reject book which are in pending status

    Scenario: As an Admin I can Approve Book
        Given I am on the "approve_book" page
        When I click the "approve--btn" button
        Then I should see "Approve success" message

    Scenario: As an Admin I can Reject Book
        Given I am on the "approve_book" page
        And I click the "reject--btn" button
        And I should see "reject-modal" modal
        When I click the "yes-btn" button
        Then I should see "Reject success" message






