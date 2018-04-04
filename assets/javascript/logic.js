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

//global variables
let database = firebase.database();
//input variables and variables used for moment's calculations
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

    //assigning user inputs to variables
    name = $(".js-tName").val().trim();
    destination = $(".js-tDestination").val().trim();
    firstTrain = $(".js-tFirst").val().trim();
    frequency = $(".js-tFrequency").val().trim();

    //assigning moment functions to variables
    backDate = moment(firstTrain, "hh:mm").subtract(1, "months");
    currentTime = moment();
    diffTime = moment().diff(moment(backDate), "minutes");
    remaining = diffTime % frequency;
    minutesAway = frequency - remaining;
    nextTrain = moment().add(minutesAway, "minutes");
    nextTrainFormatted = moment(nextTrain).format("hh:mm");

        //pushes variable values to their corresponding fields in firebase
        database.ref().push({
        name: name,
        destination: destination,
        frequency: frequency,
        firstTrain: firstTrain,
        minutesAway: minutesAway,
        nextTrainFormatted: nextTrainFormatted,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
            //clears user inputs from the input fields
            name = $(".js-tName").val("");
            destination = $(".js-tDestination").val("");
            firstTrain = $(".js-tFirst").val("");
            frequency = $(".js-tFrequency").val("");

});

//Upon recieving new data from the app, the data base returns the new values to the app
//and displays them in the main table
database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot){

    //creates variables and assigns instructions to create new html elements
    //specifically, these create new table rows and data corresponding to newly recieved
    //values in the database
    let newTrain = $("<tr>");
    let newName = $("<td class='t-data'>" + snapshot.val().name + "</td>");
    let newDestination = $("<td class='t-data'>" + snapshot.val().destination + "</td>");
    let newFrequency = $("<td class='t-data'>" + snapshot.val().frequency + "</td>");
    let newNextTrain = $("<td class='t-data'>" + snapshot.val().nextTrainFormatted + "</td>");
    let newMinutesAway = $("<td class='t-data'>" + snapshot.val().minutesAway + "</td>");

        //appends the new html elements to the apps main table
        $(".t-table").append(newTrain);
        newTrain.append(newName).append(newDestination).append(newFrequency).append(newNextTrain).append(newMinutesAway);


});

})