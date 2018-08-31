
var win;
var winner;
var currentPlayer;
var bucket1;
var bucket2;


var Cup = function(value){
  this.value = value;
}


var cup1;
var cup2;
var cup3;
var cup4;
var cup5;
var cup6;
var cup7;
var cup8;
var cup9;
var cup10;
var cup11;


var board;

var start = function() {
  win = false;
  winner = "";
  currentPlayer = "Player 1";

  bucket1 = new Cup(0);
  bucket2 = new Cup(0);

  cup0 = new Cup(4);
  cup1 = new Cup(4);
  cup2 = new Cup(4);
  cup3 = new Cup(4);
  cup4 = new Cup(4);
  cup5 = new Cup(4);
  cup6 = new Cup(4);
  cup7 = new Cup(4);
  cup8 = new Cup(4);
  cup9 = new Cup(4);
  cup10 = new Cup(4);
  cup11 = new Cup(4);

  board = [cup0, cup1, cup2, cup3, cup4, cup5, cup6, cup7, cup8, cup9, cup10, cup11];
  UpdateCSS();
  scoreBoard();
  $('#winner').remove();
}

var moveCount = 0;
var pebblesPickedUp = 0;

var move = function (index) {
  pebblesPickedUp = board[index].value;
  moveCount = board[index].value;
  board[index].value = 0;


  for(var = i = moveCount; i>-0; i--){
    //player 1 turn
    if(currentPlayer === "Player 1" && pebblesPickedUp === 1 && index === 11){
      bucket1.value++;
      pebblesPickedUp --;
    }
    else if( currentPlayer === "Player 1" && pebblesPickedUp > 1 && index ===11){
      bucket1.value++;
      board[index].value++;
      pebblesPickedUp-= 2;
    }
    else if(currentPlayer === "Player 1" && pebblesPickedUp > 0){
      index++;
      board[index].value++;
      pebblesPickedUp--;
    }
    else if (currentPlayer === "Player 1" && pebblesPickedUp === 0 && board[index].value === 1
    && ((6 <= index) && (index <= 11))
    && board[11-index].value > 0){
      update(index);
    }
    //player 2 turn
    if(currentPlayer === "Player 2" && pebblesPickedUp === 1 && index === 5){
      bucket2.value++;
      pebblesPickedUp = -1;
    }
    else if( currentPlayer === "Player 2" && pebblesPickedUp > 1 && index ===5){
      bucket2.value++;
      board[index].value++;
      pebblesPickedUp -= 2;
    }
    else if(currentPlayer === "Player 2" && pebblesPickedUp > 0){
      if(index === 11){
        index = 0;
        board[index].value++;
        pebblesPickedUp--;
      }
      index++;
      board[index].value++;
      pebblesPickedUp--;
    }
    else if (currentPlayer === "Player 2" && pebblesPickedUp === 0 && board[index].value === 1
    && ((6 <= index) && (index <= 11))
    && board[11-index].value > 0){
      update(index);
    }
  }

  endGame();
  winner();
  switchPlayer(index);
}

function switchPlayer(index) {
  if(currentPlayer === "Player 1"){
    if(pebblesPickedUp === -1 && index === 11){
      console.log("Go again");
      currentPlayer = "Player 1";
    }
    else{
      currentPlayer = "Player 2";
      console.log("Change Players");
    }
  }
  else if(currentPlayer === "Player 2"){
    if(pebblesPickedUp === -1 && index === 5){
      console.log("Player Goes Again");
      currentPlayer = "Player 2";
    }
    else{
      currentPlayer = "Player 1";
      console.log("Change Player");
    }
  }
  UpdateCSS();
}

function scoreBoard(){
  $('#currentPlayer').text("Current Player: "+ currentPlayer);
  for (var i= 0; i <board.length; i += 1){
    $('#cup' + i).text(board[i].value)
  }
  $('#bucket1').text(bucket1.value);
  $('#bucket2').text(bucket2.value);
}

var update = function(index){
  if(currentPlayer === "Player 1"){
    bucket1.value += board[index].value + board[11-index].value;
    $(".right").text("+" + (board[index].value + board[11-index].value));
  }
  else{
    bucket2.value +=  board[index].value + board[11-index].value;
    $(".left").text("+" + (board[index].value)+ board[11-index.value]);
  }
  board[11-index].value = 0;
  board[index],value = 0;
}

function UpdateCSS(){
  if(currentPlayer === "Player 1"){
    $(".p1").removeclass("stopper");
    $(".p2").addClass("stopper");
    $("#p1").addClass("currentPlayer");
    $("#p2").removeclass("currentPlayer");
  }
  else{
    $(".p2").removeclass("stopper");
    $(".p1").addClass("stopper");
    $("#p2").addClass("currentPlayer");
    $("#p1").removeclass("currentPlayer");
  }
}


function winner(){
  if(win === true){
    if(bucket1.value > bucket2.value){
      winner = "Player 1";
    }
    else if(bucket2.value > mancala1.value){
      winner = "Player 2";
    }
    else {
      winner = "Tie Game!"
    } $('body').append($('<div id="winner"').text(winnter+ " is the Winner!");
  }
}


function endGame(){
  if((board[0].value === 0 && board[1]. value === 0 &&
    board[2].value === 0 && board[3]. value === 0 &&
    board[4].value === 0 && board[5]. value === 0 ) ||
    (board[6].value === 0 && board[7]. value === 0 &&
      board[8].value === 0 && board[9]. value === 0 &&
      board[10].value === 0 && board[11]. value === 0 )){
        win = true;

        for( var i = 0 ; i <= 5; i++){
          bucket2.value += board[i].value;
          board[i].value = 0;
        }

        for(var i = 6; i < 11; i++){
          bucket1.value += board[i].value;
          board[i].value = 0;
        }
      }
    }
    start();
