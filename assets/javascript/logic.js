$(document).ready(function(){
    
//Initialize Firebase
var config = {
    apiKey: "AIzaSyD05aibACnCkwyZq29dC3Wb3iFmwf-UpHo",
    authDomain: "train-project-646f7.firebaseapp.com",
    databaseURL: "https://train-project-646f7.firebaseio.com",
    projectId: "train-project-646f7",
    storageBucket: "train-project-646f7.appspot.com",
    messagingSenderId: "676281918262"
  };
firebase.initializeApp(config);
let database = firebase.database();

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



database.ref().push({
name: name,
destination: destination,
frequency: frequency,
minutes: minutes,
next: next,
dateAdded: firebase.database.ServerValue.TIMESTAMP
});


});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

let newTrain = $("<tr>");
let newName = $("<td class='t-data'>" + snapshot.val().name + "</td>");
let newDestination = $("<td class='t-data'>" + snapshot.val().destination + "</td>");
let newFrequency = $("<td class='t-data'>" + snapshot.val().frequency + "</td>");
let newMinutes = $("<td class='t-data'>" + snapshot.val().minutes + "</td>");
let newNext = $("<td class='t-data'>" + snapshot.val().next + "</td>");

$(".t-table").append(newTrain);
newTrain.append(newName).append(newDestination).append(newFrequency).append(newMinutes).append(newNext);

console.log(snapshot.val().name);
})

})