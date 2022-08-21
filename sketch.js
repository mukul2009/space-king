var score =0;

var gun,bluebubble,redbubble, bullet, backBoard;

var gunImg,bubbleImg, bulletImg, blastImg, backBoardImg;
var gameover,gameoverImg ;  
var redBubbleGroup, redBubbleGroup, bulletGroup;
var reset,resetImg
var backgroundImg
var life =3;
var score=0;
var gameState=1

function preload(){
  gunImg = loadImage("spaceship1.png")
  blastImg = loadImage("blast.png")
gameoverImg = loadImage("go.png")
  // blastImg = Image("blast.png")
  resetImg = loadImage("reset.png")
   // blastImg = LoadImage("blast.png")
    // blastImg = loadImage("blast.jpg")

    backgroundImg = loadImage("spacebacground.jpg");

  bulletImg = loadImage("bullet1.png")
  blueBubbleImg = loadImage("obstacle1.png")
  redBubbleImg = loadImage("obstacle2.png")
  backBoardImg= loadImage("h.png")
}













function setup() {
  createCanvas(windowWidth,windowHeight);

  backBoard= createSprite(20, 200, 100,height);
  backBoard.addImage(backBoardImg)
backBoard.scale = 1.9

gameover = createSprite(700, 300, 100,height);
gameover.addImage(gameoverImg)
gameover.scale = 1.1


  gun= createSprite(100, height/2, 50,50);
  gun.addImage(gunImg)
  gun.scale=0.6

  
  reset= createSprite(100, height/2, 50,50);
  reset.addImage(resetImg)
  reset.scale=0.6;
  

  bulletGroup = createGroup();   
  blueBubbleGroup = createGroup();   
  redBubbleGroup = createGroup();   
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

















function draw() {
  background(backgroundImg);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(gameState===1){
    gun.y=mouseY
    reset.visible = false;  
gun.visible = true;
    gameover.visible = false;

    if (frameCount % 80 === 0) {
      drawblueBubble();
    }

    if (frameCount % 100 === 0) {
      drawredBubble();
    }

    if(keyDown("space")){
      shootBullet();
    }

    if (blueBubbleGroup.collide(backBoard)){
      handleGameover(blueBubbleGroup);
    }
    if (redBubbleGroup.collide(backBoard)) {
      handleGameover(redBubbleGroup);
    }
    
    if(blueBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(blueBubbleGroup);
    }

    if(redBubbleGroup.collide(bulletGroup)){
      handleBubbleCollision(redBubbleGroup);
    }

    
  }
   if(mousePressedOver(reset)){
    gameState = 1;
    score = 0;
    life = 3;
   }
    
  drawSprites();
}












function drawblueBubble(){
  bluebubble = createSprite(800,random(20,780),40,40);
  bluebubble.addImage(blueBubbleImg);
  bluebubble.scale = 0.2;
  bluebubble.velocityX = -8;
  bluebubble.lifetime = 400;
  blueBubbleGroup.add(bluebubble);
}






function drawredBubble(){
  redbubble = createSprite(800,random(20,780),40,40);
  redbubble.addImage(redBubbleImg);
  redbubble.scale = 0.3;
  redbubble.velocityX = -8;
  redbubble.lifetime = 400;
  redBubbleGroup.add(redbubble);
}





function shootBullet(){
  bullet= createSprite(200, 300, 50,20)
  bullet.y= gun.y-5
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}













function handleBubbleCollision(bubbleGroup){
    if (life > 0) {
       score=score+1;
    }

    //blast= createSprite(bullet.x+60, bullet.y, 50,50);
    //blast.addImage(blastImg)

     //blast= sprite(bullet.x+60, bullet.y, 50,50);
  // blast.addImage(blastImg)

     blast= createSprite(bullet.x+60, bullet.y, 50,50);
    blast.addImage(blastImg)

     //blast= createSprite(bullet.x+60, bullet.y, 50,50);
  //  image(blastImg)


   blast.scale=0.3
   blast.life=20
    bulletGroup.destroyEach()
    bubbleGroup.destroyEach()
}








function handleGameover(bubbleGroup){
  
    life=life-1;
    bubbleGroup.destroyEach();
    

    if (life === 0) {
      gameState=2
      gameover.visible = true;
      redBubbleGroup.destroyEach();
      reset.visible = true;
      blueBubbleGroup.destroyEach();
      gun.visible = false;
      
     
    }
  
}
