Feature: Hello World — Cucumber + Playwright integration proof
  As a developer
  I want to verify that the Cucumber + Playwright setup is functional
  So that I can add BDD scenarios going forward

  Scenario: The application is accessible at its base URL
    Given I open the application home page
    Then the page URL should contain "localhost:3004"
  Scenario: User finds the secret combination and registers as winner
    Given I open the application home page
    Then the page URL should contain "localhost:3004"
    Given I populate the app and wait for assets to load

  # Step 1 - Build the secret combination
    When I add all secret assets to the playlist
    When I select the "glossy" sound

 