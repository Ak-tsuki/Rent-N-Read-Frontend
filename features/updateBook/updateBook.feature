Feature: Update details of listed books 

    As a User, I want to  update details of a book I have listed.

    Scenario: As a User, I want to see the update success toast message when I update details of a book
        Given I am on the "dashboard" page
        And I click the "update-details-btn" button
        And I should see "update-book-btn" button
        And I click on "name" input
        And I enter "test" as my "name"
        And I click on "author" input
        And I enter "test" as my "author"
        And I click on "desc" input
        And I enter "test" as my "desc"
        When I click the "update-book-btn" button
        Then I should see "success" message
