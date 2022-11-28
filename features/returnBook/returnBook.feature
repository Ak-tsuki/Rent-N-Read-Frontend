Feature: Return Book

    As a Renter I want to return book which i had rented.

    Scenario: As an Renter I can return book
        Given I am on the "dashboard" page
        And I click the "rented-books-btn" button
        And I click the "return-btn" button
        Then I should see "Returned success" message

