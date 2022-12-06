Feature: Exchange Book

    As a user, I want to exchange book

    Scenario: As a user I want to exchange the book
        Given I am on the "books" page
        And I click the "Vmore-btn" button
        And I click the "exchangeBook-btn" button
        When I click the "exchange-req-btn" button
        Then I should see "error" message
