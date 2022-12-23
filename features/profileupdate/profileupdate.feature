Feature: Update profile details of users

    As a User, I want to update profile details of users.

    Scenario: As a User, I want to see the profile update success toast message when I update details of user profile
        Given I am on the "profileupdate" page
        And I click the "updateProfile-btn" button
        And I click on "first_name" input
        And I enter "Naruto" as my "first_name"
        And I click on "last_name" input
        And I enter "Uzumaki" as my "last_name"
        And I click on "address" input
        And I enter "Konoha" as my "address"
        And I click on "contact_no" input
        And I enter "9861291534" as my "contact_no"
        When I click the "update-profile-btn" button
        Then I should see "success" message
