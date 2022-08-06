var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie;
var score=0

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")

  bgImg = loadImage("assets/bg.jpeg")
  
  zombie3Img =loadImage("assets/zombie3.png")
  zombie2Img =loadImage("assets/zombie2.png")
  zombieImg = loadImage("assets/zombie.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  balaImg = loadImage("assets/bala.png")
}

function setup() {
database = firebase.database();
  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1

zombiesGroup=new Group
balasGroup= new Group

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)


}

function draw() {
  background(0); 


  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
  player.y = player.y+30
}
 if(keyDown("LEFT_ARROW")||touches.length>0){
  player.x = player.x-30
}
if(keyDown("RIGHT_ARROW")||touches.length>0){
 player.x = player.x+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  var BalaImg = createSprite(displayWidth-1050, player.y-30, 50, 50)
  BalaImg.addImage(balaImg)
  BalaImg.scale=0.1
  BalaImg.velocityX= 1.5
  balasGroup.add(BalaImg);
  player.addImage(shooter_shooting)
}

if(zombiesGroup.isTouching(balasGroup)){
 for(var i= 0; i<zombiesGroup.length; i++){
  if(zombiesGroup[i].isTouching(balasGroup)){
   zombiesGroup[i].destroy();
   balasGroup.destroyEach();
   score= score+100;

  }
 }
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}



hearts();
zombies();



drawSprites();

textSize(25);
fill("white")
text("score:"+score,250,100);

}

function hearts(){
  var heart1 = createSprite(800,55,60,50)
  heart1.addImage(heart1Img)
  heart1.scale =0.3

  var heart2 = createSprite(700,55,60,50)
  heart2.addImage(heart2Img)
  heart2.scale =0.3

  var heart3 = createSprite(733.5,55,40,40)
  heart3.addImage(heart3Img)
  heart3.scale=0.32

}

function zombies(){
  if(frameCount %50===0){
    var zombie= createSprite(random(500,1000),random(500,100),50,60)
    zombie.addImage(zombie2Img)
    zombie.velocityX= -1.2
    zombie.scale= 0.55

    zombiesGroup.add(zombie);
  }

}