# Feature: Register

#     As a User I should be able to register to the application
#     if i Provide the right username, email, contact no. and password
#     Otherwise I should be shown a register failed message

#     Scenario: As a user I can register
#         Given I am on the "register" page
#         And I enter "tsering13" as my "username"
#         And I enter "ts12@gmail.com" as my "email"
#         And I enter "89953543" as my "contactno"
#         And I enter "1234567" as my "password"
#         When I click the "register-btn" button
#         Then I should be on the "register success" page

#     Scenario: As a user I will see a failed register message if I fall the register
#         Given I am on the "register" page
#         And I enter "tsering13" as my "username"
#         And I enter "ts12@gmail.com" as my "email"
#         And I enter "89953543" as my "contactno"
#         And I enter "1234567" as my "password"
#         When I click the "register-btn" button
#         Then I should see "error" message

