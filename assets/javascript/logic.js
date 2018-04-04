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
let firstTrain = "";
let frequency = "";


let backDate = "";
let currentTime = "";
let diffTime = "";
let remaining = "";
let minutesAway = "";
let nextTrain = "";
let nextTrainFormatted = "";



$(".js-submit").on("click", function(){
    event.preventDefault();

name = $(".js-tName").val().trim();
destination = $(".js-tDestination").val().trim();
firstTrain = $(".js-tFirst").val().trim();
frequency = $(".js-tFrequency").val().trim();
backDate = moment(firstTrain, "hh:mm").subtract(1, "months");
currentTime = moment();
diffTime = moment().diff(moment(backDate), "minutes");
remaining = diffTime % frequency;
minutesAway = frequency - remaining;
nextTrain = moment().add(minutesAway, "minutes");
nextTrainFormatted = moment(nextTrain).format("hh:mm");


database.ref().push({
name: name,
destination: destination,
frequency: frequency,
firstTrain: firstTrain,
minutesAway: minutesAway,
nextTrainFormatted: nextTrainFormatted,
dateAdded: firebase.database.ServerValue.TIMESTAMP
});

name = $(".js-tName").val("");
destination = $(".js-tDestination").val("");
firstTrain = $(".js-tFirst").val("");
frequency = $(".js-tFrequency").val("");

});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

let newTrain = $("<tr>");
let newName = $("<td class='t-data'>" + snapshot.val().name + "</td>");
let newDestination = $("<td class='t-data'>" + snapshot.val().destination + "</td>");
let newFrequency = $("<td class='t-data'>" + snapshot.val().frequency + "</td>");
let newNextTrain = $("<td class='t-data'>" + snapshot.val().nextTrainFormatted + "</td>");
let newMinutesAway = $("<td class='t-data'>" + snapshot.val().minutesAway + "</td>");


$(".t-table").append(newTrain);
newTrain.append(newName).append(newDestination).append(newFrequency).append(newNextTrain).append(newMinutesAway);

console.log(snapshot.val().name);

});

})