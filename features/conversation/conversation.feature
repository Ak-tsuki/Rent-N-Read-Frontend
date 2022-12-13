Feature: Start a conversation

    As a User, I want to start a conversation 

    # Scenario: As a user I want to start a conversation with the book owner.
    #     Given I am on the "singleebookpages" page
    #     And I click the "conversation" button
    #     Then I should see "new conversation" message
       
    Scenario: As a User, I want to chat with the bookowner
        Given I am on the "messagepage" page
        And I click on "sender-btn" input
        And I enter "hello" as my "text"
        And I click on "send-btn" input