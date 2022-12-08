Feature: Search Book

    As a user I want to search books according to book name or author

    Scenario: As a user I can search books
        Given I am on the "books" page
        And I enter "collen" as my "search-query"
        And I click the "search-btn" button
        Then I should see "search-result" component

