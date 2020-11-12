  var knife,knifeImage,knifeGroup;
  var fruit,fruit1,fruit2,fruit3,fruit4,fruitGroup;
  var alien1,alien2,alienmoving,alienGroup;
  var gameover,gameOverImage;
  var gameOverSound,knifeSound;
  var back,backImage;
  var fn,fnImage;
  var PLAY=1;
  var END=0;
  var gameState=1;
  var score;
  var scoreIi,scoreI;
  var images,imagesI;
  var smashed,smashedI;
  var congrats,congImage;

function preload(){
  backImage=loadImage("back.png");
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");

  knifeImage=loadImage("sword.png"); 
  
  gameOverImage=loadImage("gameover.png");
  
  alien1=loadImage("alien1.png")
  alien2=loadImage("alien2.png")
  
  fnImage=loadImage("title.jpg");
  
  knifeSound=loadSound("knifeSwooshSound.mp3");
  
  gameOverSound=loadSound("gameover.mp3");
  
  imagesI=loadImage("fruit1.png");
  
  congImage=loadImage("cong.jpg");
  
  scoreI=loadImage("score.png");
  
  smashedI=loadImage("smashed.jpg");
  
  score=0;
  
  knifeGroup=new Group();
  
  fruitGroup=new Group();
  
  alienGroup=new Group();
 
}

function setup(){
   createCanvas(500,400);
    back=createSprite(200,200,500,400);
    back.addImage(backImage);
    back.scale = 1.8;

    knife=createSprite(40,200,20,20);
    knife.addImage(knifeImage);
    knife.scale=0.5;
    
    fn=createSprite(250,20,20,20);
    fn.addImage(fnImage);
    fn.scale=0.5;
    
    images=createSprite(400,380,20,20);
    images.addImage(imagesI);
    images.scale=0.18;
    
    gameover=createSprite(250,200,20,20);
    gameover.addImage(gameOverImage);
    gameover.visible=false;
    
    congrats=createSprite(250,15,20,20);
    congrats.addImage(congImage);
    congrats.scale=1.5;
    congrats.visible=false;
    
    scoreIi=createSprite(380,380,20,20);
    scoreIi.addImage(scoreI);
    scoreIi.scale=0.25;
    scoreIi.visible=false;
    
    smashed=createSprite(200,200,20,20);
    smashed.addImage(smashedI);
    smashed.scale=0.5;
    smashed.visible=false;
}

function draw(){
  if(gameState===PLAY){
  knife.x=World.mouseX;
  knife.y=World.mouseY;
  back.velocityX = -(3+score/15);
  if(back.x < 120){
  back.x = back.width/2;
  }
  
  if(fruitGroup.isTouching(knife)){ 
    fruitGroup.destroyEach();
    score=score+2;
    knifeSound.play();
  }
  
  if(alienGroup.isTouching(knife)){
    gameState=END;
    gameOverSound.play();
  }
   fruit();
   alien();
  }
  if(gameState===END){
    fruitGroup.destroyEach();
    alienGroup.destroyEach();
    fruitGroup.velocityX=0;
    back.velocityX=0;
    alienGroup.velocityX=0;
    fn.visible=false;
    images.visible=false;
   
    fruitGroup.setLifetimeEach=-1;
    knife.addImage(gameOverImage);
    knife.x=250;
    knife.y=200;
    knife.scale=2;
    congrats.visible=true;
    scoreIi.visible=true;
  }
  drawSprites();
  fill("white");
  stroke("white");
  text("=  "+ score, 430,390);
}
function fruit(){
  if(World.frameCount%80===0){
  var fruit=createSprite(400,200,20,20);
  fruit.scale=0.2;
  r=Math.round(random(1,4));

if(r==1) {
  fruit.addImage(fruit1);
  fruit.velocityX=-(7+score/4);
  fruit.x=400;
}
      
else if(r==2){
  fruit.addImage(fruit2);
  fruit.x=0;
  fruit.velocityX=(7+score/4);
}
      
else if(r==3){
  fruit.addImage(fruit3);
  fruit.velocityX=-(7+score/4);
  fruit.x=400;
}
      
else{
  fruit.addImage(fruit4);
  fruit.velocityX=(7+score/4);
  fruit.x=0;
} 
  fruitGroup.add(fruit);
}   
}

function alien(){ 
  if(World.frameCount%200===0){
    var alien=createSprite(400,200,20,20);
    alien.addImage(alien1);
    alien.y=Math.round(random(100,300));
    alien.velocityX=-(8+score/10);
    alien.x=400;
    alienGroup.add(alien);   
    var alienB=createSprite(0,200,20,20);
    alienB.addImage(alien2);
    alienB.y=Math.round(random(100,300));
    alienB.velocityX=(8+score/10);
    alienB.x=0;
    alienGroup.add(alienB);  
  }
}