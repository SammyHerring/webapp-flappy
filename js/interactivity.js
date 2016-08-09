jQuery("#scoresbtn").on("click", function() {
    console.log("you pressed the score");
    jQuery("#content").empty();
    jQuery("#content").append(
        "<ul>" +
            "<li>" + "Me" + "</li>" +
            "<li>" + "Also me" + "</li>" +
            "<li>" + "Me again" + "</li>" +
        "</ul>"
    );
});

jQuery("#creditsbtn").on("click", function() {
    console.log("you presed the credits button");
    jQuery("#content").empty();
    jQuery("#content").append(
        "<p>" + "Game created by Bob!" + "</p>"
    );
});

jQuery("#helpbtn").on("click", function() {
    console.log("You pressed help");
    jQuery("#content").empty();
    jQuery("#content").append("<ul>" + "<li>" + "Press SPACE to flap your wings" + "</li>" + "<li>" + "Avoid the incoming pipes" + "</li>" + "</ul>");
});

function getData() {
  var playerName1 = document.getElementById("p1user");
  var playerName2 = document.getElementById("p2user");

  // var scoreEntry = "<p>" + playerName1.value + ":" + score1 + playerName2.value + "</p>";

  if (score1 > score2){
    var scoreEntry = "<p>" + p1user.value + ": " + score1.toString() + "</p>";
  } else if (score1 === score2) {
    var scoreEntry = null;
    alert("No Winner");
  } else {
    var scoreEntry = "<p>" + p2user.value + ": " + score2.toString() + "</p>";
  }

  //localStorage();
  jQuery("#content").empty();
  jQuery("#scoreBoard").append(scoreEntry);
}

// function localStorage() {
//   if(localStorage){ // make sure the browser supports localStorage
//     // WRITING DATA
//     // sample array of scores
//     var scores = [{"Player 1" : 1000}, {"Player 2":900}, {"Player 3": 800}];
//     // save the data under the key "scores"
//     localStorage.setItem("scores", JSON.stringify(scores));
//
//     // READING DATA
//     // if localStorage contains something under the key "scores"
//     if(localStorage.getItem("scores") !== null)
//     {
//         // read the data saved in localStorage
//         var data = localStorage.getItem("scores");
//         // turn the data from JSON into an array.
//         var scores = JSON.parse(data);
//     }
// }
// }


function reset() {
  game.state.restart();
  location.reload();
}

function registerScore(score1, score2) {
  if (share === true) {
  if (confirm("Share your score?")) {
    var playerName1 = prompt("Player 1 Name:");
    var playerName2 = prompt("Player 2 Name:");
    var scoreEntry1 = "<li>" + playerName1 + ": " + score1.toString() + "</li>";
    var scoreEntry2 = "<li>" + playerName2 + ": " + score1.toString() + "</li>";
  } else {
    alert("What a sad world we live in");
  }
}}
