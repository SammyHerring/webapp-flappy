// the Game object used by the phaser.io library
var stateActions = { preload: preload, create: create, update: update };
var game = new Phaser.Game(790, 400, Phaser.AUTO, 'game', stateActions);

//Global Variables and constants
var score1 = 0;
var score2 = 0;
var labelScore1;
var labelScore2;

var player1;
var player2;
var body;

var splashDisplay;

var pipes = [];
var p1dead = false;
var p2dead = false;

var gapSize = 100;
var gapMargin = 50;
var blockHeight = 50;

var height = 400;
var width = 790;

var gameGravity = 200;
var gameSpeed = 200;
var jumpPower = 200;

var pipeInterval = 1.75;
var pipeGap = 100;
var pipeEndExtraWidth = 5  ;
var pipeEndHeight = 10;

var share = false;
var end = false;
var started = false;

/*
 * Loads all resources for the game and gives them names.
 */
function preload() {
  game.load.image("playerImg1", "../assets/flappy_jobs.png");
  game.load.image("playerImg2", "../assets/flappy_woz.png");
  game.load.audio("score", "../assets/point.ogg");
  game.load.image("pipeBlock","../assets/pipe2-body.png");
  game.load.image("pipeEnd","../assets/pipe2-end.png");
  game.load.audio("Mario", "../assets/Mario.wav");
  game.load.image("bg", "../assets/bg.png");
}

/*
 * Initialises the game. This function is only called once.
 */
function create() {

  game.stage.setBackgroundColor("#FFFFFF");
  var started = false;

  splashDisplay = game.add.text(100,200, "Press ENTER to start, SPACEBAR to jump");
  game.input.keyboard.addKey(Phaser.Keyboard.ENTER).onDown.add(start);
} //End of CREATE Func

function start() {
  splashDisplay.visible = false;
  var backgroungVelocity = gameSpeed / 10;
  var backgroundSprite = game.add.tileSprite(0, 0, width, height, "bg");
  backgroundSprite.autoScroll(-backgroungVelocity, 0);

  /// START OF MAIN GAME SCRIPT ///

  //Game GFX and Physics
  game.stage.setBackgroundColor("#71C5CF");
  game.add.text(20, 20, "FlappyWoz", {font: "35px Helvetica", fill: "#FFFFFF"});
  game.physics.startSystem(Phaser.Physics.ARCADE);

  //Event Handlers
  game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR).onDown.add(spaceHandler);
  game.input.keyboard.addKey(Phaser.Keyboard.M).onDown.add(Mario);

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

  var started = true;

  //HUD
  game.add.text(20, 60, "Player 1: ",  {font: "30px Helvetica", fill: "#FFFFFF"});
  game.add.text(20, 100, "Player 2: ",  {font: "30px Helvetica", fill: "#FFFFFF"});
  labelScore1 = game.add.text(150, 60, "0",  {font: "30px Helvetica", fill: "#FFFFFF"});
  labelScore2 = game.add.text(150, 100, "0",  {font: "30px Helvetica", fill: "#FFFFFF"});

  //Player1 Elements
  player1 = game.add.sprite(100, 200, "playerImg1");
  player1.x = 225;
  player1.y = 200;
  game.physics.arcade.enable(player1);
  player1.body.velocity.y = 25;
  player1.body.gravity.y = 500;

  //Player2 Elements
  player2 = game.add.sprite(100, 200, "playerImg2");
  player2.x = 225;
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

  /// END OF MAIN GAME SCRIPT ///

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
  //  game.add.sprite(game.world.randomX, game.world.randomY, "playerImg");

    if (started === true) {

    //Disable until called by create function - da da da?

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

    } // END of Started Check System
}

function gameOver() {
  p1dead = false;
  p2dead = false;
  game.paused = true;
  //registerScore(score1, score2);
  //location.reload()
  var end = true;
}

 //START Custom Funcions
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

//Player 1
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
    var gapStart = game.rnd.integerInRange(gapMargin, height - gapSize - gapMargin);

    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart - pipeEndHeight);
    for(var y = gapStart - pipeEndHeight; y > 0; y -= blockHeight) {
        addPipeBlock(width, y - blockHeight);
    }
    addPipeEnd(width - (pipeEndExtraWidth / 2), gapStart + gapSize);
    for(var y = gapStart + gapSize + pipeEndHeight; y < height; y += blockHeight) {
        addPipeBlock(width, y);
    }
    changeScore1();
    changeScore2();
}

function addPipeBlock(x, y) {
  var pipeBlock = game.add.sprite(x,y,"pipeBlock");
  pipes.push(pipeBlock);
  game.physics.arcade.enable(pipeBlock);
  pipeBlock.body.velocity.x = -200;
}

function addPipeEnd(x, y) {
    var  endBlock = game.add.sprite(x, y, "pipeEnd");
    pipes.push(endBlock);
    game.physics.arcade.enable(endBlock);
    endBlock.body.velocity.x = - gameSpeed;
}

function Mario() {
  game.sound.play("Mario");
}
 //END Custom Functions
