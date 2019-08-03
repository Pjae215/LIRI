//code to read and set any environment variables with the dotenv package
require("dotenv").config();

// Variables npm packages: Inquire, File Service, Axios, Moments
let inquirer = require("inquirer");
let fs = require("fs");
let axios = require("axios");
let moment = require('moment');
let Spotify = require('node-spotify-api');
let keys = require("./keys");
let spotify = new Spotify(keys.spotify);

//Defining functions based on user's response
//Concert-this/Bands In Town
RunBandsinTown = function() {

    inquirer.prompt([
        {type: "input",
        message: "Enter the name of an artist or band",
        name: "choice"}
                ])

    .then(function(band) {
    let artist = band.choice
    
    //  console.log(band.choice);
// Now we can run axios
 axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp")
.then(function (bandObject) {
for (var i = 0; i < 3; i++) { // returns 3 responses
    //for requested mm/dd/yyyy format
    let datetime = moment(bandObject.data[i].datetime).format('L');
     //Get venue info
    console.log("Venue: " + bandObject.data[i].venue.name);
    console.log("Venue Location: " + bandObject.data[i].venue.location);
    console.log("Event Date: " + datetime);
    }
});
    });}

//Movie-this/ OMBD
RunOmbd = function () {
    
    inquirer.prompt([
          { type: "input",
            message: "Enter the name of a movie",
            name: "choice"}   ])
    
    .then(function(movie){
    
     let movieName = movie.choice

    // need to assign default of Mr.Nobody...do I put netflix content or do I run axios

// request movie info through api
 
 axios.get("http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=bdbc2c22")
.then(function (movieObject) {

    //  }
    //  else {
            // console.log(movieObject);
            console.log("Title: " + movieObject.data.Title);
            console.log("Released: " + movieObject.data.Year);
            console.log("IMDB rating: " + movieObject.data.Ratings[0].Value);
            console.log("Rotten Tomatoes rating: " + movieObject.data.Ratings[1].Value);
            console.log("Produced in: " +  movieObject.data.Country);
            console.log("Film Language: " + movieObject.data.Language);
            console.log("Movie Plot: " + movieObject.data.Plot);
            console.log("Starring: " + movieObject.data.Actors);
        // }  
    }); });}

//Random-this/ Do what it says
RunNike = function(){
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
          return console.log("Just do it");
        }
      
     console.log(data);
      
      });
    }

//Spotify-this/Spotify
RunSpotify = function() {

    inquirer.prompt([
        {type: "input",
        message: "Enter the name of a song",
        name: "choice"}
                ])

    .then(function(spot) {

    let spotsong = spot.choice
    

    spotify.search({ type: 'track', query: spotsong }, function(err, data) {
        let response = data.tracks.items;
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        // console.log(response);
        for (var i = 0; i < 3; i++) {
      
        console.log("Song name: " + response[i].name);
        console.log("Artist(s): " + response[i].artists[0].name);
        console.log("Album Title: " + response[i].album.name);
        console.log("Preview song: " + response[i].preview_url);
    
    }
// // read spotify node api and key file

// //fs.readFile(keys);
});
});}



//Initial questions for user
inquirer.prompt([
    {   type: "list",
        message: "Which item are you interested in?",
        choices: ["concert-this", "movie-this", "spotify-this","random-this"],
        name: "choice",
        
 }])

 .then(function(response) {

//then do this based on user's choice
    if (response.choice == "movie-this") {
        RunOmbd(); }

    else if (response.choice == "concert-this") {
        RunBandsinTown();
    }
    else if (response.choice == "spotify-this") {
        RunSpotify();
    }
    else if (response.choice == "random-this") {
        RunNike();
    }
else console.log("Your selection is invalid");


 });
