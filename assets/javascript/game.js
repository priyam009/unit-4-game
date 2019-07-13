//Declaring Variables

  var players = {
    "Obi-Wan Kenobi": {
      hp:120,
      cap: 15
    },
    "Luke Skywalker": {
      hp: 100,
      cap: 5
    },
    "Darth Vader": {
      hp: 150,
      cap: 20
    },
    "Darth Maul": {
      hp: 180,
      cap: 25
    }
  };

  var yourName;
  var defName;

  var yourHP;
  var defHP;

  var yourAP;
  var defCAP;

//----------------------------------------------------

//functions

  //TODO Initialize all the values when the game starts
  function initialize() {

    //Updating the HP text on HTML
    $("#kenobiHP-text").html("HP: " + players["Obi-Wan Kenobi"]["hp"]);
    $("#skywalkerHP-text").html("HP: " + players["Luke Skywalker"]["hp"]);
    $("#vaderHP-text").html("HP: " + players["Darth Vader"]["hp"]);
    $("#maulHP-text").html("HP: " + players["Darth Maul"]["hp"]);

    //Instruction for the player to follow
    $("#comments").html("Select your Player");

    //Setting initial Attack Power to 0
    yourAP=0;

    //Hiding the REPLAY button until the end of game
    $("#replay").hide();

    //Calling function to select your player
    myPlayer();
  };

  //TODO Function to select your player attacker
  function myPlayer() {
    //When your player is selected
    $("#players-content>div").click(function() {
      $("#your-player").append(this);
      $("#your-player>div").removeClass("col-md-3");
      $("#your-player>div").addClass("yourContent");
      $("#action-area>button").addClass("attack-btn");

      //Getting name of your player from the object players and saving in variable
      yourName = $(".yourContent>p:first").text();

      //Adding Health power value to a variable
      yourHP = players[yourName]["hp"];

      //Initializing the Attack power to 8
      yourAP = 8;

      //Click function off after selecting your player
      $("#players-content>div").off("click");

      //Rest of the unselected player go to the opponent area
      $("#players-content>div").each(function() {
        $("#opp-player").append(this);
      });

      //Instruction for the player to follow
      $("#comments").html("Select your opponent");

      //Calling function to select opponents/defenders
      opponents();
    });
  };

  //TODO Funtion to select the next opponent
  function opponents() {
    //When opponent is selected
    $("#opp-player>div").click(function() {
      $("#def-player").append(this);
      $("#def-player>div").removeClass("col-md-3");
      $("#def-player>div").addClass("defContent");
    
      //Getting name of opponent player from the object players and saving in variable
      defName = $(".defContent>p:first").text();

      //Click function off after selecting opponent player
      $("#opp-player>div").off("click");

      //Adding Health power value to a variable
      defHP = players[defName]["hp"];

      //Adding Counter Attack Power value to a variable
      defCAP = players[defName]["cap"];

      //Instruction for the player to follow
      $("#comments").html("Attack Attack Attack!!!");

      //Calling function to attack
      attackPlayer();

    });
  };

  //TODO Function to attack and update result
  function attackPlayer() {
    //When Attack button pressed
    $("#attack").click(function() {
      
      //reducing opponent health power by your attack power
      defHP -= yourAP; 

      //reducing your health power by opponents counter attack power
      yourHP -= defCAP;

      //your attack power increases by 8   
      yourAP += 8;        

      //Updating your and opponents health power on HTML
      $(".yourContent>p:last").html("HP: " + yourHP);
      $(".defContent>p:last").html("HP: " + defHP);

      //Calling function to check if won or lost
      checkLost();
      checkWin();

    });

  };

  function checkLost() {
    //TODO Adding condition to check if defeated current opponent
    if(defHP <= 0) {
      //current opponent lost, remove from the defender area
      $("#def-player>div").remove();

      //Turn attack button off until next opponent selected
      $("#attack").off("click");

      //Turn Opponent selection on to select next opponent
      $("#opp-player>div").on("click");

      //Instruction for the player to follow
      $("#comments").html("Select next opponent");

      //calling opponent function for the next round
      opponents(); 
    }

    //TODO adding condition to check if Lost
    else if(yourHP <= 0) {
      //Lost, remove from attacker area
      $("#your-player>div").remove();

      //Game over, attack button off
      $(".attack").off("click");

      //Hide Attack button
      $("#attack").hide();

      //Show Play Again button
      $("#replay").show();

      //Instruction for the player to follow
      $("#comments").html("oh no!! you lost");

      //When Play Again button pressed, calls replay function
      $("#replay").click(function() {
        replay();
      });
    }
  };

  //TODO adding function to check if Won
  function checkWin() {
    if($("#opp-player>div").length == 0 && $("#def-player>div").length == 0) {
      //Game over, attack button off
      $(".attack").off("click");

      //Hide Attack button
      $("#attack").hide();

      //Show Play Again button
      $("#replay").show();
      
      //Instruction for the player to follow
      $("#comments").html("woohoo!! you won");

      //When Play Again button pressed, calls replay function
      $("#replay").click(function() {
      replay();
      });
    }
  };

  //TODO function to reload page on Game Over
  function replay() {
    location.reload(true);
  };


//Calling the initialize function to start game
$(document).ready(function() {
  initialize();
});