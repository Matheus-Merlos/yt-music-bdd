Feature: Spotify Playlist Management

As an authenticated Spotify user
I want to manage my playlists
So that I can organize, listen to, and share my music in a personalized way

    Scenario: Create a playlist with a valid name
        Given I am authenticated in Spotify
        When I request to create a playlist with the name "Fat Sounds"
        Then the playlist should be created successfully
        And the playlist should be associated with my account
        And the playlist visibility should be set to private by default

    Scenario: Do not allow playlist creation without a name
        Given I am authenticated in Spotify
        When I request to create a playlist without providing a name
        Then the system should reject the request
        And I should receive an error message indicating that the playlist name is required

    Scenario: Delete an existing playlist
        Given I am authenticated in Spotify
        And I have a playlist named "Study"
        When I request to delete the playlist
        Then the playlist should be deleted successfully
        And the playlist should no longer appear in my playlist list

    Scenario: Rename an existing playlist with a valid name
        Given I am authenticated in Spotify
        And I have a playlist named "Road Trip"
        When I rename the playlist to "Road Trip 2025"
        Then the new playlist name should be saved
        And the playlist should be displayed with the updated name

    Scenario: Rename an existing playlist with a valid name
        Given I am authenticated in Spotify
        And I have a playlist named "Road Trip"
        When I rename the playlist to "Road Trip 2025"
        Then the new playlist name should be saved
        And the playlist should be displayed with the updated name

    Scenario: Add an existing track to a playlist
        Given I am authenticated in Spotify
        And I have a playlist named "Favorites"
        And the track "Imagine" exists in the catalog
        When I add the track to the playlist
        Then the track should be added successfully
        And the track should be placed at the end of the playlist

    Scenario: Remove a track from a playlist
        Given I am authenticated in Spotify
        And I have a playlist containing the track "Imagine"
        When I remove the track from the playlist
        Then the track should no longer be present in the playlist

    Scenario: Change playlist visibility to public
        Given I am authenticated in Spotify
        And I have a private playlist
        When I change the playlist visibility to public
        Then the playlist should be visible to other users

    Scenario: Change playlist visibility to private
        Given I am authenticated in Spotify
        And I have a public playlist
        When I change the playlist visibility to private
        Then the playlist should no longer be visible to other users

    Scenario: Play a track from a playlist
        Given I am authenticated in Spotify
        And I have a playlist with at least one track
        When I select a track from the playlist to play
        Then the selected track should start playing

    Scenario: Reorder tracks within a playlist
        Given I am authenticated in Spotify
        And I have a playlist with multiple tracks
        When I move a track to a different position in the playlist
        Then the new track order should be saved successfully
        And playback should follow the updated track order
