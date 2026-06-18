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
    Then the playlist should contain the secret combination of assets

  # Step 2 - Submit the combination
    When I click the "Valide le spectacle" button
    Then I should see the success message "Incroyable, tu as trouvé la combinaison secrète !"
    And I should see the text "Tu es le premier à trouver la combinaison secrète, félicitations !"

  # Step 3 - Watch the winning video
    Then a video player should be displayed
    And the video should start playing automatically

  # Step 4 - Register as winner
    When I type "Karine" in the "Trouvé par" text field
    And I fill in the "Email" field with "karine.majdalani@gmail.com"
    And I click the "Enregistre" button
    Then my name and email should be saved in the database
