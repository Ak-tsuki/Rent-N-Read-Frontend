Feature: Rent EBook

    As a User I should be shown a warning message to select more that 3 days for
    renting the ebook when I don't select any dates and the no of days is 0

    Scenario: As a user I will get a warning message if I set no of days for rent less that 3 days
        Given I am on the "singleebookpage" page
        And I click the "rent-ebook-btn" button
        When I click the "send-rent-request-btn" button
        Then I should see "warning" message
