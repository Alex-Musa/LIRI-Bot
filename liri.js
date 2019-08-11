require('dotenv').config();

var keys = require('./keys.js');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
var request = process.argv[2];
var response = process.argv[3];

switch (request) {
  case 'concert-this':
    concertThis(response);
    break;
  case 'spotify-this-song':
    spotifyThis(response);
    break;
  case 'movie-this':
    movieThis(response);
    break;
  case 'do-what-it-says':
    doThis(response);
    break;
}

function concertThis(response) {
  axios
    .get(
      'https://rest.bandsintown.com/artists/' +
        response +
        '/events?app_id=trilogy'
    )
    .then(function(response) {
      response.data.forEach(element => {
        var result =
          '\nVenue: ' +
          element.venue.name +
          '\nLocation: ' +
          element.venue.city +
          ' ' +
          element.venue.region +
          ' ' +
          element.venue.country +
          '\nDate: ' +
          moment(element.datetime).format('MM/DD/YYYY') +
          '\n_________________________________________';
        console.log(result);
      });
    })
    .catch(function(error) {
      console.log(error);
    });
}

function spotifyThis(response) {
  if (!response) {
    response = 'The Sign';
  }
  spotify
    .search({ type: 'track', query: response })
    .then(function(response) {
      response.tracks.items.forEach(element => {
        var result =
          '\nArtist: ' +
          element.artists[0].name +
          '\nTitle: ' +
          element.name +
          '\nPreview Link: ' +
          element.preview_url +
          '\nAlbum: ' +
          element.album.name +
          '\n_________________________________________';
        console.log(result);
      });
    })
    .catch(function(err) {
      console.log(err);
    });
}

function doThis(response) {
  fs.readFile('random.txt', 'utf8', function(error, data) {
    if (error) {
      return console.log(error);
    }
    var data = data.split(',');
    switch (data[0]) {
      case 'concert-this':
        concertThis(data[1]);
        break;
      case 'spotify-this-song':
        spotifyThis(data[1]);
        break;
      case 'movie-this':
        movieThis(data[1]);
        break;
    }
  });
}

function movieThis(response) {
  if (!response) {
    response = 'mr nobody';
  }
  axios
    .get(
      'https://www.omdbapi.com/?t=' + response + '&y=&plot=short&apikey=trilogy'
    )
    .then(function(response) {
      var result =
        '\nTitle: ' +
        response.data.Title +
        '\n' +
        '\nYear: ' +
        response.data.Year +
        '\n' +
        '\nIMDB Rating: ' +
        response.data.imdbRating +
        '\n' +
        '\nRotten Tomatoes Rating: ' +
        response.data.Ratings[1].Value +
        '\n' +
        '\nCountry: ' +
        response.data.Country +
        '\n' +
        '\nLanguage: ' +
        response.data.Language +
        '\n' +
        '\nPlot: ' +
        response.data.Plot +
        '\n' +
        '\nStarring: ' +
        response.data.Actors +
        '\n' +
        '\n_________________________________________';
      console.log(result);
    })
    .catch(function(error) {
      console.log(error);
    });
}
