//The variables for the images
var bananaImage,bananaGroup,obstacleImage,obstacleGroup,backgroundImage,score,playerAnimation;

//The playble immages
var player,obstacles,banana,invisibleGround,jungle;

//The game state
var PLAY = 1,
    END = 0;
    gameState = PLAY

function preload() {
  playerAnimation = loadAnimation('Monkey_01.png','Monkey_02.png','Monkey_03.png','Monkey_04.png','Monkey_05.png','Monkey_07.png','Monkey_08.png','Monkey_09.png','Monkey_10.png');
  
  bananaImage = loadImage("banana.png");
  
  obstacleImage = loadImage("stone.png");
  
  backgroundImage = loadImage("jungle.jpg");
  
}

function setup() {
  createCanvas(400, 400);
  
  //The monkey
  player = createSprite(20,370,10,10);
  player.addAnimation('idk',playerAnimation);
  player.scale = 0.1;
  
  //The background
  jungle = createSprite(200,200,400,400);
  jungle.addImage('idk as well',backgroundImage);
  jungle.x = jungle.width/2;
  jungle.velocityX = -3;
  
  //The depth
  player.depth = jungle.depth +1;
  
  //The invisible ground
  invisibleGround = createSprite(200,380,4000,10);
  invisibleGround.visible = false;
  invisibleGround.velocityX = -3;
   
  //The obstacles
  obstacleGroup = new Group();
  
  //The bananas
  bananaGroup = new Group();
  
  //The score
  score = 0;
  
  //The monkey collider
  player.setCollider("circle",0,0,120);
  
}

function draw() {
  background(220);
  
  if(gameState === PLAY) {
    score = score + 0.1;
  
  //The collision
  player.collide(invisibleGround);
  
  //The gravity
  player.velocityY = player.velocityY + 0.8;
  
  //The jumping
  if(keyDown('space') && player.y >= 339) {
    player.velocityY = -12;
  }
    
  //The infinite ground
  if(jungle.x < 0) {
    jungle.x = jungle.width/2;
  }
  
  //The infinite land
  if(invisibleGround.x < 0){
    invisibleGround.x = invisibleGround.width/2;
  }
  
  if(bananaGroup.isTouching(player)) {
    score = score + 2;
    bananaGroup.destroyEach();
    player.scale = player.scale +0.02;
  }
    
  if(obstacleGroup.isTouching(player)) {
    gameState = END;
    player.scale = 0.1;
  }
  spawnObstacles();
  spawnBananas();
    
  }else if (gameState === END) {
    jungle.velocityX = 0;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    player.velocityY = 0;
  }
 
  drawSprites();

  //The text
  stroke('white');
  fill('white');
  textSize(20);
  text('Score: ' + Math.round(score),300,50);
}
  
function spawnObstacles() {
  
  if(frameCount % 70 === 0){
    obstacles = createSprite(400,350,10,10);
    obstacles.addImage('OOF',obstacleImage);
    obstacles.velocityX = -(4 + score/100);
    obstacles.scale = 0.2;
    obstacles.lifetime = 100;
 
     //The stone collider
  obstacles.setCollider("circle",0,0,60);
    
    obstacleGroup.add(obstacles);
  }
}
  
function spawnBananas () {
  
  if(frameCount % 90 === 0) {
    banana = createSprite(400,225,10,10);
     var randY = random(350,270);
    banana.addImage('noice',bananaImage);
    banana.velocityX = -(3 + score/100);
    banana.scale = 0.05;
    banana.y = randY;
    banana.lifetime = 133;
    
    bananaGroup.add(banana);
  }
}