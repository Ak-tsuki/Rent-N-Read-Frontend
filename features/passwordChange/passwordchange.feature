Feature: Change password of users

    As a User, I want to change password of my account.

    Scenario: As a User, I want to see the password change success toast message when I change the password
        Given I am on the "profileupdate" page
        And I click the "password-btn" button
        And I click on "old-password" input
        And I enter "shakyarijwol09" as my "old-password"
        And I click on "new-password" input
        And I enter "rijwolshakya09" as my "new-password"
        When I click the "change-password-btn" button
        Then I should see "success" message
