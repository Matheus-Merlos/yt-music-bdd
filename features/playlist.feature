Feature: YouTube Music Playlist Management

    As an valid YouTube Music user
    I want to manage my playlists
    So that I can organize, listen to, and share my music in a personalized way

    Scenario: Create a playlist with a valid name
        Given I have a Google account
        And Execute login Scenario
        When I request to create a playlist with the name "DO ROCK"
        Then the playlist should be created successfully

    Scenario Outline: Do not allow playlist creation with an invalid name
        Given I have a Google account
        And Execute login Scenario
        When I request to create a playlist with the name <playlistName>
        Then the system should reject the request with the message <errorMessage>

        Examples:
            | playlistName | errorMessage          |
            | "   "        | "Ops! Ocorreu um erro." |
            | ""           | "Obrigatório"           |

    Scenario: Add an existing track to a playlist
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist named "DO ROCK"
        And the track "Imagine" exists in the catalog
        When I add the track to the playlist
        Then the track should be added successfully
        And the track should be placed at the end of the playlist


    Scenario: Remove a track from a playlist
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist containing the track "Imagine"
        When I remove the track from the playlist
        Then the track should no longer be present in the playlist


    Scenario: Play a track from a playlist
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist with at least one track
        When I select a track from the playlist to play
        Then the selected track should start playing


    Scenario: Change playlist visibility to public
        Given I have a Google account
        And Execute login Scenario
        And I have a private playlist
        When I change the playlist visibility to public
        Then the playlist should be visible to other users

    Scenario: Change playlist visibility to private
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist named "DO ROCK"
        And The playlist is public
        When I change the playlist visibility to private
        Then the playlist should no longer be visible to other users

    Scenario: Change playlist visibility to public
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist named "DO ROCK"
        And The playlist is private
        When I change the playlist visibility to public
        Then the playlist should be visible to other users

    Scenario: Rename an existing playlist with a valid name
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist named "DO ROCK"
        When I rename the playlist to "DO SAMBA"
        Then the new playlist name should be saved

    Scenario: Delete an existing playlist
        Given I have a Google account
        And Execute login Scenario
        And I have a playlist named "DO SAMBA"
        When I request to delete the playlist
        Then the playlist should no longer appear in my playlist list
