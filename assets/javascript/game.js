
$(document).ready(function(){

let win = 0;
let lose = 0;
let number = 0;
let playerScore = 0;
let input;
let randomNumber = []; 
let buttonValues = [];
let randomValues;


$("#number").text(number);
$("#playerScore").text(playerScore);
$("#wins").text(win);
$("#losses").text(lose);

function rando(){ 
  let value = Math.floor(Math.random() * 101) + 20;
  randomNumber.push(value);
  $("#number").text(randomNumber)
};

function startGame(){ 
  randomNumber=[];
  rando();
  buttonValues=[];
  gen();
  number = randomNumber;
  playerScore = 0;
  
  $("#number").text(number);
};

function add(){
  playerScore = playerScore + input;

};

function eval(){
  let a = number;
  let b = playerScore;
  
if ( a > b ){
  console.log("youve won nothing yet");
}
else if ( a < b ){
  lose++;
  console.log("youve lost " + lose + " games");
  $("#losses").text(lose);
  alert("LOSER! You've lost, because you can't math at all.")
  playerScore = 0;
}
  else {
  win++;
  console.log("youve won " + win + " games");
  $("#wins").text(win);
  alert("You've won! But don't get cocky, kid. Can you win again?")
  playerScore = 0;
} 
};

function gen(){
for ( var i=0; i < 4; i++){
  randomValues = Math.floor(Math.random() * 19); 
  buttonValues.push(randomValues);
}
  console.log(buttonValues);
};

function resetGame(){
  $("#wins").text(0);
  $("#losses").text(0);
  $("#playerScore").text(0);
  $("#number").text(0);
}

$("#startButton").on("click", function(){
  startGame()
} );

$("#clearButton").on("click", function(){
  resetGame()
});

$("#button1").on("click", function(){
  console.log("help")
  input = buttonValues[0];
  add();
  eval();
  $("#playerScore").text(playerScore);
});

$("#button2").on("click", function(){
  input = buttonValues[1];
  add();
  eval();
  $("#playerScore").text(playerScore);
});

$("#button3").on("click", function(){
  input = buttonValues[2];
  add();
  eval();
  $("#playerScore").text(playerScore);
});

$("#button4").on("click", function(){
  input = buttonValues[3];
  add();
  eval();
  $("#playerScore").text(playerScore);
});
});