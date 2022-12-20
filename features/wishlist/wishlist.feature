Feature: Add books to Wishlist

    As a user I want to add some of the book that I might buy in future in a wishlist.

    Scenario: As a user I want to add some of the book that I might buy in future in a wishlist.
        Given I am on the "wishlist" page
        And I click the "wishlist_btn" button
        Then I should see "Added-to-wishlist" message

    Scenario: As a user I want to delete book from my wishlist.
        Given I am on the "delete-wishlist" page
        And I click the "delete-book-btn" button
        And I should see "delete-modal" modal
        And I click the "yes-btn" button
        Then I should see "delete-wishlist" message