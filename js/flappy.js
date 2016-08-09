// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };

// Phaser parameters:
// - game width
// - game height
// - renderer (go for Phaser.AUTO)
// - element where the game will be drawn ('game')
// - actions on the game state (or null for nothing)
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

//Global Variables and constants
var score1 = 0;
var score2 = 0;
var labelScore1;
var labelScore2;
var player1;
var player2;
var pipes = [];
var p1dead = false;
var p2dead = false;
var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;
var height = 400;
var share = false;
var end = false;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg1", "../assets/flappy_jobs.png");
  game.load.image("playerImg2", "../assets/flappy_woz.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {
    //Game GFX and Physics
    game.stage.setBackgroundColor("#009900");
    game.add.text(20, 20, "FlappyBird", {font: "35px Helvetica", fill: "#FFFFFF"});
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //Event Handlers
    game.input.onDown.add(clickHandler);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);

    game.input.keyboard.addKey(Phaser.Keyboard.RIGHT).onDown.add(moveRight1);
    game.input.keyboard.addKey(Phaser.Keyboard.LEFT).onDown.add(moveLeft1);
    game.input.keyboard.addKey(Phaser.Keyboard.UP).onDown.add(moveUp1);
    game.input.keyboard.addKey(Phaser.Keyboard.DOWN).onDown.add(moveDown1);
    game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(playerJump1);

    game.input.keyboard.addKey(Phaser.Keyboard.W).onDown.add(moveUp2);
    game.input.keyboard.addKey(Phaser.Keyboard.A).onDown.add(moveLeft2);
    game.input.keyboard.addKey(Phaser.Keyboard.S).onDown.add(moveDown2);
    game.input.keyboard.addKey(Phaser.Keyboard.D).onDown.add(moveRight2);
    game.input.keyboard.addKey(Phaser.Keyboard.X).onDown.add(playerJump2);

    //HUD
    game.add.text(20, 60, "Player 1: ",  {font: "30px Helvetica", fill: "#FFFFFF"});
    game.add.text(20, 100, "Player 2: ",  {font: "30px Helvetica", fill: "#FFFFFF"});
    labelScore1 = game.add.text(150, 60, "0",  {font: "30px Helvetica", fill: "#FFFFFF"});
    labelScore2 = game.add.text(150, 100, "0",  {font: "30px Helvetica", fill: "#FFFFFF"});

    //Player1 Elements
    player1 = game.add.sprite(100, 200, "playerImg1");
    player1.x = 150;
    player1.y = 200;
    game.physics.arcade.enable(player1);
    player1.body.velocity.y = 25;
    player1.body.gravity.y = 500;


    //Player2 Elements
    player2 = game.add.sprite(100, 200, "playerImg2");
    player2.x = 150;
    player2.y = 300;
    game.physics.arcade.enable(player2);
    player2.body.velocity.y = 25;
    player2.body.gravity.y = 500;


    //Pipes

    var pipeInterval = 1.75 * Phaser.Timer.SECOND;
game.time.events.loop(
    pipeInterval,
    generatePipe
);

      //generatePipe();
}

function p1kill() {
  player1.kill();
  p1dead = true;
}

function p2kill() {
  player2.kill();
  p2dead = true;
}

function update() {
    game.physics.arcade.overlap(player1, pipes, p1kill);
    game.physics.arcade.overlap(player2, pipes, p2kill);

      if(player1.body.y < 0 || player1.body.y > 400){
        p1kill();
      }
      if(player2.body.y < 0 || player2.body.y > 400){
        p2kill();
      }
      if (p1dead === true && p2dead === true){
        gameOver();
      }
}

function gameOver() {
  p1dead = false;
  p2dead = false;
  console.log("waazaaaaas");
  game.paused = true;
  //registerScore(score1, score2);
  //location.reload()
  var end = true;


}

 //START Custom Funcions

 function clickHandler(event) {
    //alert("The position is: " + event.x + "," + event.y);
    //game.add.sprite(event.x, event.y, "playerImg");
}

function spaceHandler() {
    game.sound.play("score");
}

function changeScore1() {
  if (p1dead === false){
    score1 = score1 + 1;
    labelScore1.setText(score1.toString());
}
}

function changeScore2() {
  if (p2dead === false){
	   score2 = score2 + 1;
     labelScore2.setText(score2.toString());
}
}

function moveRight1() {
	player1.x += 10;
}

function moveLeft1() {
	player1.x -= 10;
}

function moveUp1() {
	player1.y -= 10;
}

function moveDown1() {
	player1.y += 10;
}

function playerJump1() {
    player1.body.velocity.y = -200;
}

//Player 2

function moveRight2() {
	player2.x += 10;
}

function moveLeft2() {
	player2.x -= 10;
}

function moveUp2() {
	player2.y -= 10;
}

function moveDown2() {
	player2.y += 10;
}

function playerJump2() {
    player2.body.velocity.y = -200;
}

//Pipes
function generatePipe() {
  if (end === false) {
  var gap = game.rnd.integerInRange(1 ,5);
    for (var count = 0; count < 8; count++) {
        if (count != gap && count != gap+1) {
            addPipeBlock(750, count * 50);
        }
    }
    changeScore1();
    changeScore2();
}}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}
 //END Custom Functions
