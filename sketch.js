  var path,boy,cash,diamonds,jwellery,sword;
  var pathImg,boyImg,boyEnd_img,cashImg,diamondsImg,jwelleryImg,swordImg;
  var treasureCollection = 0;
  var cashG,diamondsG,jwelleryG,swordGroup;
  var PLAY=1;
  var END=0;
  var gameState = 1;
  var treasureCollection=0;
  var gameover;
  var obstacle_img;
  var restart_Img,restart;
  var boyrun;
  function preload(){
    pathImg = loadImage("Road.png");
    boyImg = loadAnimation("runner1.png","runner2.png","runner1.png","runner2.png");
    cashImg = loadImage("cash.png");
    diamondsImg = loadImage("diamonds.png");
    jwelleryImg = loadImage("jwell.png");
    swordImg = loadImage("sword.png");
    endImg =loadImage("gameOver.png");
     obstacle_img=loadImage("obstacle3.png");
   restartImg=loadImage("restart.png")
  boyrun = loadAnimation("runner2.png","runner1.png")
  }

  function setup(){

    createCanvas(400,400);
  // Moving background
  path=createSprite(200,200);
  path.addImage(pathImg);
  path.velocityY = 4;

   restart=createSprite(200,100,20,20);
  restart.addImage(restartImg);
    restart.scal=0.25;

  //creating boy running
   boy = createSprite(70,330,20,20);
  boy.addAnimation("boyRunning",boyrun);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;
  boy.lifetime=-1;

  gameover = createSprite(200,200,20,20);
    gameover.addImage(endImg);



  cashG=new Group();
  diamondsG=new Group();
  jwelleryG=new Group();
  swordG=new Group();
  obstacleG=new Group();
  }

  function draw() {

    background(0);


    //code to reset the background


    if(gameState===PLAY){

      if(path.y > 400 ){
      path.y = height/2;
    }
      boy.x = World.mouseX;




    edges= createEdgeSprites();
    boy.collide(edges);

      createCash();
      createDiamonds();
      createJwellery();
      createSword();
      spawnObstacle();
      if (cashG.isTouching(boy)) {
        cashG.destroyEach();
    treasureCollection=treasureCollection+50;

      }
      else if (diamondsG.isTouching(boy)) {
        diamondsG.destroyEach();
        treasureCollection=treasureCollection+150;

      }else if(jwelleryG.isTouching(boy)) {
        jwelleryG.destroyEach();
      treasureCollection=treasureCollection+100;

      }

    if(swordG.isTouching(boy)) {
         gameState=END;
        swordG.destroyEach();

      } else if(obstacleG.isTouching(boy)){

         gameState=END;
        obstacleG.destroyEach();
       }
      gameover.visible=false;  
       restart.visible=false;  
    }
   else if (gameState===END){
   cashG.destroyEach();
  cashG.setVelocityYEach(0);

     diamondsG.destroyEach();
     diamondsG.setVelocityYEach(0);

     jwelleryG.destroyEach();
     jwelleryG.setVelocityYEach(0);

     swordG.destroyEach();
     swordG.setVelocityYEach(0);

     obstacleG.destroyEach();
     obstacleG.setVelocityYEach(0);



    path.velocityY =0;


      if(mousePressedOver(restart)) {
       boy.changeAnimation("boyRunning",boyrun);
        reset();

    }     


     gameover.visible=true; 
     restart.visible=true; 

   }



    drawSprites();

    textSize(20);
    fill(255);
    text("Treasure: "+ treasureCollection,50,30);


    }






  function createCash() {
    if (World.frameCount % 50 == 0) {
    var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
    cash.addImage(cashImg);
    cash.scale=0.12;
    cash.velocityY = 3;
    cash.lifetime = 150;
    cashG.add(cash);
    }
  }

  function createDiamonds() {
    if (World.frameCount % 80 == 0) {
    var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
    diamonds.addImage(diamondsImg);
    diamonds.scale=0.03;
    diamonds.velocityY = 3;
    diamonds.lifetime = 150;
    diamondsG.add(diamonds);
  }
  }

  function createJwellery() {
    if (World.frameCount % 80 == 0) {
    var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
    jwellery.addImage(jwelleryImg);
    jwellery.scale=0.13;
    jwellery.velocityY = 3;
    jwellery.lifetime = 150;
    jwelleryG.add(jwellery);
    }
  }

  function createSword(){
    if (World.frameCount % 150 == 0) {
    var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
    sword.addImage(swordImg);
    sword.scale=0.1;
    sword.velocityY = 3;
    sword.lifetime = 150;
    swordG.add(sword);
    }
  }

  function spawnObstacle(){
    if (World.frameCount % 100 == 0) {
    var obstacle = createSprite(Math.round(random(50, 350),40, 10, 10));
    obstacle.addImage(obstacle_img);
    obstacle.scale=0.1;
    obstacle.velocityY = 3;
    obstacle.lifetime = 150;
    obstacleG.add(obstacle);
    }
  }

  function reset(){
    gameState = PLAY;
    gameover.visible = false;
    restart.visible = false;
    treasureCollection = 0;



  }

