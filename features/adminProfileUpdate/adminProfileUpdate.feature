Feature: Update profile details of admin

    As a Admin, I want to update profile details of users.

    Scenario: As a Admin, I want to see the profile update success toast message when I update details of user profile
        Given I am on the "adminprofileupdate" page
        And I click the "updateProfile-btn" button
        And I click on "first_name" input
        And I enter "Mike" as my "first_name"
        And I click on "last_name" input
        And I enter "Tyson" as my "last_name"
        And I click on "address" input
        And I enter "Canada" as my "address"
        And I click on "contact_no" input
        And I enter "9" as my "contact_no"
        When I click the "update-profile-btn" button
        Then I should see "success" message

