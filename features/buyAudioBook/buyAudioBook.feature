Feature: Buy Audio Book

    As a User, I want to buy audio book so that i can listen to them.

    Scenario: As a user I want to select a audio book and select buy then proceed to checkout page with pay with khalti button. 
        Given I am on the "homepage" page
        And I click the "singlepage" button
        And I am on the "singleaudiobookpage" page
        And I click the "buy-btn" button
        Then I should see "buyaudiobook-btn" button
