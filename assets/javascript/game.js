

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

  function initialize() {
    $("#kenobiHP-text").html("HP: " + players["Obi-Wan Kenobi"]["hp"]);
    $("#skywalkerHP-text").html("HP: " + players["Luke Skywalker"]["hp"]);
    $("#vaderHP-text").html("HP: " + players["Darth Vader"]["hp"]);
    $("#maulHP-text").html("HP: " + players["Darth Maul"]["hp"]);

    $("#comments").html("Select your Player");

    yourAP=0;
    $("#replay").hide();

    myPlayer();
  };

  function myPlayer() {
    $("#players-content>div").click(function() {
      $("#your-player").append(this);
      $("#your-player>div").removeClass("col-md-3");
      $("#your-player>div").addClass("yourContent");
      $("#action-area>button").addClass("attack-btn");


      yourName = $(".yourContent>p:first").text();
      yourHP = players[yourName]["hp"];
      yourAP = 8;

      $("#players-content>div").off("click");

      $("#players-content>div").each(function() {
        $("#opp-player").append(this);
      });
      $("#comments").html("Select your opponent");

      opponents();
    });
  };

  function opponents() {
    $("#opp-player>div").click(function() {
      $("#def-player").append(this);
      $("#def-player>div").removeClass("col-md-3");
      $("#def-player>div").addClass("defContent");
    


      defName = $(".defContent>p:first").text();

      $("#opp-player>div").off("click");

      defHP = players[defName]["hp"];
      defCAP = players[defName]["cap"];

      $("#comments").html("Attack Attack Attack!!!");

      $(".attack").on("click");
      attackPlayer();

    });
  };

  function attackPlayer() {
    $("#attack").click(function() {
      defHP -= yourAP;
      yourHP -= defCAP;
      yourAP += 8;

      $(".yourContent>p:last").html("HP: " + yourHP);
      $(".defContent>p:last").html("HP: " + defHP);

      console.log("yourHP", yourHP);
      console.log("defHP", defHP);
      console.log("yourAP", yourAP);
      console.log("----------");

      checkLost();
      checkWin();

    });

  };

  function checkLost() {
    
    //Defeated one opponent
    if(defHP <= 0) {
      $("#def-player>div").remove();
      $("#attack").off("click");
      $("#opp-player>div").on("click");
      $("#comments").html("Select next opponent");
      opponents();
    }

    //You Lose
    else if(yourHP <= 0) {
      $("#your-player>div").remove();
      $(".attack").off("click");
      $("#replay").show();
      $("#attack").hide();
      $("#comments").html("damn you lost");
      $("#replay").click(function() {
      replay();
      });
    }
  };

  //You Win
  function checkWin() {
    if($("#opp-player>div").length == 0 && $("#def-player>div").length == 0) {
      $(".attack").off("click");
      $("#replay").show();
      $("#attack").hide();
      $("#comments").html("woohoo!! you won");
      $("#replay").click(function() {
      replay();
      });
    }
  };

  function replay() {
    location.reload(true);
  };



$(document).ready(function() {
  initialize();
});