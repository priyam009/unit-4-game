var players = {
  kenobi: {
    name: "Obi-Wan Kenobi",
    hp:120,
    cap: 15
  },
  skywalker: {
    name: "Luke Skywalker",
    hp: 100,
    cap: 5
  },
  vader: {
    name: "Darth Vader",
    hp: 150,
    cap: 20
  },
  maul: {
    name: "Darth Maul",
    hp: 180,
    cap: 25
  }
};

var attackPower = 8;

var kenobiHPText = $("#kenobiHP-text");
var skywalkerHPText = $("#skywalkerHP-text");
var vaderHPText = $("#vaderHP-text");
var maulHPText = $("#maulHP-text");


$(kenobiHPText).text(players.kenobi.hp);
$(skywalkerHPText).text(players.skywalker.hp);
$(vaderHPText).text(players.vader.hp);
$(maulHPText).text(players.maul.hp);


function player() {
  $("#content>div").click(function() {
    $("#your-character").append($(this));
    $("#content>div").each(function(index, element) {
      $("#opp-character").append($(this));
    });
  });
};



player();












