/*--------------------------------------------------------*/
var PLAY = 1;
var END = 0;
var WIN = 2;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var jungle, invisiblejungle;
var kangaroo;
var invisibleground;

var obstaclesGroup, obstacle1;

var score=0;

var gameOver, restart;

function preload(){
  kangaroo_running =   loadAnimation("assets/kangaroo1.png","assets/kangaroo2.png","assets/kangaroo3.png");
  kangaroo_collided = loadAnimation("assets/kangaroo1.png");
  jungleImage = loadImage("assets/bg.png");
  shrub1 = loadImage("assets/shrub1.png");
  shrub2 = loadImage("assets/shrub2.png");
  shrub3 = loadImage("assets/shrub3.png");
  obstacle1 = loadImage("assets/stone.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
  jumpSound = loadSound("assets/jump.wav");
  collidedSound = loadSound("assets/collided.wav");
}

function setup() {
  createCanvas(800, 400);

  jungle = createSprite(400,100,400,20);
  jungle.addImage("jungle",jungleImage);
  jungle.scale=0.3
  jungle.x = width /2;

  kangaroo = createSprite(125,300,50,50);
  kangaroo.addAnimation("running",kangaroo_running);
  kangaroo.addAnimation("collide",kangaroo_collided);
  kangaroo.scale=0.18;

  invisibleground = createSprite(400,350,800,10);
  invisibleground.visible = false

  kangaroo.setCollider("circle",0,0,300);
  kangaroo.debug = false

  shrubsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;

}

function draw() {
  background(255);
  
  kangaroo.x = camera.position.x-270

  

  if(gameState===PLAY){

    jungle.velocityX=-4;

    if (jungle.x < 0){
      jungle.x = jungle.width/2;
    }

    if(keyDown("space")&& kangaroo.y >=100) {
      kangaroo.velocityY = -13;
  }
  
  //add gravity
  kangaroo.velocityY = kangaroo.velocityY + 0.8

  if(shrubsGroup.isTouching(kangaroo)){
    
}

  if(obstaclesGroup.isTouching(kangaroo)){
    gameState = END;
}
  
  
  
  
  spawnShrubs()
  spawnObstacles()

  }

 else (gameState===END){

     jungle.velocityX=0;
     kangaroo.velocityX=0;
   
     
  }

       kangaroo.collide(invisibleground);

    drawSprites();

}


function spawnShrubs(){

  if (frameCount % 150 === 0) {
    shrub = createSprite(camera.position.x+500,330,40,10);
   

   var rand = Math.round(random(1,3));
   switch(rand) {
     case 1: shrub.addImage(shrub1);
             break;
     case 2: shrub.addImage(shrub2);
             break;
     case 3: shrub.addImage(shrub3);
             break;     
     default: break;
   }

   shrub.scale = 0.05;
   shrub.velocityX = -4;
   shrub.lifetime = 300;

   shrubsGroup.add(shrub);
 
  }


}



function spawnObstacles(){

  //write code here to spawn the clouds
   if (frameCount % 800 === 0) {
     Obstacle = createSprite(600,100,40,10);
    Obstacle.y = Math.round(random(340,350));
    Obstacle.addImage(obstacle1);
    Obstacle.scale = 0.19;
    Obstacle.velocityX = -4;
    
     //assign lifetime to the variable
    Obstacle.lifetime = 134;
    
    
   
     
    //adding cloud to the group
   obstaclesGroup.add(Obstacle);
    }

}
