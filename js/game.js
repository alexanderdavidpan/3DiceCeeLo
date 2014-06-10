//Asks for number of players and bet per player to show what the pot will be.
var playerNum = prompt("Number of players?");
var wager = prompt("How much will each player wager?");
var pot = "$" + playerNum * wager;
var playerCounter = 1;

$(document).ready(function(){
  $('#pot').append("Pot: " + pot);
})

function rollDice() {
  var roll = Math.floor(Math.random() * 6) + 1;
  return roll
}

function playGame() {
  $('#outcome').empty();
  var d1 = rollDice();
  var d2 = rollDice();
  var d3 = rollDice();
  die1.innerHTML = '<img src="img/dice' + d1 + '.png">';
  die2.innerHTML = '<img src="img/dice' + d2 + '.png">';
  die3.innerHTML = '<img src="img/dice' + d3 + '.png">';
  var combo = [d1, d2, d3];
  var outcome;
      //"Trips" outcome
      if (d1===d2 && d2===d3){
        outcome = d3;
        $('#outcome').append('Outcome: Trips ' + outcome);
        $('#outcomes').append('<li class="trips" val='+ (outcome + 7) + '>Player '+ playerCounter + ": Trips " + outcome + '</li>');
        playerCounter += 1;
      }
      //"Point" outcome
      else if (d1===d2||d2===d3||d1===d3) {
        combo.sort();
        if (d1===d2){
          outcome = d3;
          $('#outcome').append('Outcome: Point ' + outcome);
          $('#outcomes').append('<li class="point" val="' + (outcome + 1) + '">Player '+ playerCounter + ": Point " + outcome + '</li>');
          playerCounter += 1;
        }
        else if (d2===d3) {
          outcome = d1;
          $('#outcome').append('Outcome: Point ' + outcome);
          $('#outcomes').append('<li class="point" val="' + (outcome + 1) + '">Player '+ playerCounter + ": Point " + outcome + '</li>');
          playerCounter += 1;
        }
        else {
          outcome = d2;
          $('#outcome').append('Outcome: Point ' + outcome);
          $('#outcomes').append('<li class="point" val="' + (outcome + 1) + '">Player '+ playerCounter + ": Point " + outcome + '</li>');
          playerCounter += 1;
        }
      }
      //Sort to see if auto win/lose or player goes again.
      else {
        combo.sort();
        if (combo[0] === 1 && combo[1] === 2 && combo[2] === 3) {
          outcome = "You lose.";
          $('#outcome').append('Outcome: ' + outcome);
          $('#outcomes').append('<li class="123" val="1">Player '+ playerCounter + ': Loses</li>');
          alert("Player " + playerCounter + " automatically loses!");
          playerCounter += 1;
        }
        else if (combo[0] === 4 && combo[1] === 5 && combo[2] === 6) {
          outcome = "You win!";
          $('#outcome').append('Outcome: ' + outcome);
          //alert("Player " + playerCounter + " wins " + pot + "!");
        }
        else {
          outcome = "Please roll again.";
          $('#outcome').append('Outcome: ' + outcome);
        }
      }
    };

    var playerScores = new Object;
    var highScore = 0;
    var winner = [];

    $(document).ready(function(){
      $('#roll').click(function(){
        playGame();
        if (playerCounter > playerNum) {
        //check for winner
        for (var i=1; i < parseInt(playerNum) + 1; i++){
          playerScores[i] = parseInt($('ul li:nth-child(' + i +')').attr('val'));
        }
        //Determine highest score 
        for( var k in playerScores) {
          if (playerScores[k] > highScore) {
            highScore = playerScores[k];
          }
        }
        //Determine winning player #
        for (var k in playerScores) {
          if (playerScores[k] === highScore) {
            winner.push(k);
          }
        }
        if (winner.length === 1){
          $("#outcomes").find("[val='" + highScore + "']").css("font-weight", "bold");
          alert("Player " + winner + " wins " + pot + "!\nPress OK to play again.");
          window.location.reload(true);
        }
        else {
          $("#outcomes").find("[val='" + highScore + "']").css("font-weight", "bold");
          alert("Players "+ winner + " win " + pot + " to be shared evenly!\nPress OK to play again.");
          window.location.reload(true);
        }
      };
    });
});