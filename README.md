### LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node application that takes in commands and returns data.

LIRI takes in the following commands:
concert-this : Takes in artist name and returns concert data from Bands In Town API.
spotify-this-song : Takes in song name and returns song information from Spotify API.
movie-this : Takes in movie name and reutrns movie information from OMDB API.
do-what-it-says : Reads random.txt file and executes the containing command.

https://www.youtube.com/watch?v=gu3RCQrw53o

### Spotify
Use the following command to run the Spotify API:

    $ node liri.js spotify-this-song '<song name here>'

The Spotify API will return search results for the song with the following information:
* Artist(s)
* The song's name
* A preview link of the song from Spotify
* The album that the song is from
![1](1.PNG)



### OMDB
Use the following command to run the OMDB API:

     $ node liri.js movie-this '<movie name here>'

The OMDB API is accessed using the `axios` package and renders the following information about the movie to the terminal:
* Title of the movie
* Year the movie came out
* IMDB Rating of the movie
* Rotten Tomatoes Rating of the movie
* Country where the movie was produced
* Language of the movie
* Plot of the movie
* Actors in the movie
