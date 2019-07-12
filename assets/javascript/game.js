$(document).ready(function() {

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

    $("#players-content>div").click(function() {
      $("#your-player").append(this);
      $("#your-player>div").removeClass("col-md-3");
      // $("#your-player>div>p:first").addClass("yourName");
      $("#your-player>div").addClass("yourContent");

      yourName = $(".yourContent>p:first").text();
      yourHP = players[yourName]["hp"];
      yourAP = 8;

      $("#players-content>div").off("click");

      $("#players-content>div").each(function() {
        $("#opp-player").append(this);
      });

      opponents();
    });
  };

  function opponents() {
    $("#opp-player>div").click(function() {
      $("#def-player").append(this);
      $("#def-player>div").removeClass("col-md-3");
      // $("#def-player>div>p:first").addClass("defName");
      $("#def-player>div").addClass("defContent");

      defName = $(".defContent>p:first").text();

      // console.log("defName",defName);

      $("#opp-player>div").off("click");

      defHP = players[defName]["hp"];
      defCAP = players[defName]["cap"];

      // console.log("yourHP", yourHP);
      // console.log("defHP", defHP);
      // console.log("defCAP", defCAP);
      // console.log("----------");

      $("#attack").on("click");
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

      checkResult();
    });
  };

  function checkResult() {
    if(defHP <= 0) {
      $("#def-player>div").remove();
      $("#attack").off("click");
      $("#opp-player>div").on("click");
      opponents();
    }

    else if(yourHP <= 0) {
      $("#your-player>div").remove();
      $("#attack").off("click");
      initialize();
    };
  }

  initialize();

});