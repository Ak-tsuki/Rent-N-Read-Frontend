Feature: Buy E-Book

    As a User, I want to buy e-book

    Scenario: As a user I want to select a e-book and select buy then proceed to checkout page with pay with khalti button.
        Given I am on the "homepage" page
        And I click the "singlepage" button
        And I am on the "singleebookpage" page
        And I click the "buy-btn" button
        Then I should see "buyebook-btn" button
