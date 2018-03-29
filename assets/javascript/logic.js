  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyD05aibACnCkwyZq29dC3Wb3iFmwf-UpHo",
    authDomain: "train-project-646f7.firebaseapp.com",
    databaseURL: "https://train-project-646f7.firebaseio.com",
    projectId: "train-project-646f7",
    storageBucket: "train-project-646f7.appspot.com",
    messagingSenderId: "676281918262"
  };
  firebase.initializeApp(config);

 let name = "";
 let destination = "";
 let frequency = 0;
 let minutes = 0;
 let next = "";

$(".js-submit").on("click", function(){

name = $(".js-tName").val().trim();
destination = $(".js-tDestination").val().trim();
frequency = $(".js-tFrequency").val().trim();
minutes = $(".js-tMinutesAway").val().trim();
next = $(".js-tNextTrain").val().trim();


})