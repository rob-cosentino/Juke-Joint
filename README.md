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
<img width="1993" height="1212" alt="image" src="https://github.com/user-attachments/assets/11a8511b-5598-4df1-8e9f-f1be5df02cdd" />


* Once an album is added, it will appear in the UI:
<img width="1268" height="1091" alt="image" src="https://github.com/user-attachments/assets/f835df76-e8e4-44be-9ac8-74804868340d" />


* When the user clicks on a song from the list of songs underneath the album cover, the app communicates with YouTube, pulling up the song from YouTube to be played within the app:
<img width="1216" height="1124" alt="image" src="https://github.com/user-attachments/assets/30b5fd35-d7e0-430d-9b30-03e473356a83" />


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
