# Juke-Joint
Juke-Joint is a full-stack web application that allows users to create a digital album collection, integrating with Spotify's API to fetch album information and YouTube's API to play tracks. Inspired by the classic charm of old-fashioned jukeboxes, it offers a modern digital collection experience, allowing users to browse, manage, and listen to their favorite albums. The application emphasizes a rich user experience with CRUD operations for album management, ensuring a dynamic and responsive interface for music enthusiasts.

## Features
* Album Collection Management: Users can create, view, and delete albums in their collection.
* Spotify Integration: Fetches detailed album information, including track lists, from Spotify.
* YouTube Integration: Allows users to listen to tracks from their album collection via YouTube.
* Autofill Suggestions: Provides autofill suggestions for album and artist names to ensure accurate data fetching.
* Responsive UI: Features a carousel-style album display, mimicking the experience of a classic jukebox.

## Features Walkthrough
* Find an album that exists on Spotify by using the input fields (autofill/suggestions connected to the Spotify API ensures proper input validation for spotify content):
<img width="1993" height="1230" alt="image" src="https://github.com/user-attachments/assets/2b277e31-6892-4ad2-989c-dad8d5b9c2d7" />


* Once an album is added, it will appear in the UI:
<img width="1971" height="1203" alt="image" src="https://github.com/user-attachments/assets/2e246fc6-ce13-4970-8b29-e3fbb7ec0012" />


* When the user clicks on a song from the list of songs underneath the album cover, the app communicates with YouTube, pulling up the song from YouTube to be played within the app:
<img width="1979" height="1218" alt="image" src="https://github.com/user-attachments/assets/9f7c37aa-d71b-4d1d-8840-e550bcdd8334" />


* The user can add as many albums as they'd like. When more albums are added, the UI containing the albums turns into a carousel, simulating an actual JukeBox:
* <img width="1798" height="1205" alt="image" src="https://github.com/user-attachments/assets/052f8af0-cef0-4c71-997d-622a7e7dfaf7" />




## Technologies
* Frontend: React, Axios, Swiper for carousel implementation.
* Backend: Node.js, Express.js, MongoDB for database management.
* APIs: Spotify for album data, YouTube for track playback.


## Usage
* Add an Album: Fill in the album and artist name in the Add Album Form. Autofill suggestions will appear as you type.
* View Album Collection: Browse your collection in the carousel view.
* Listen to Tracks: Click on any track name to play it using the integrated YouTube player.
* Delete an Album: Click the 'Delete' button on any album card to remove it from your collection.

## Made By
* Rob Cosentino

### Contact:
* robert.cosentino1@gmail.com
* linkedin.com/in/rob-cosentino/
