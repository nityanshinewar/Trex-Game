    var Play=1;
    var End=0;
    var GameState=Play
    var trex, trex_running, edges;
    var groundImage;
    var ground2;
    var invisibleground;
    var cloud;
    var cloudimage;
    var    obstacle1,obstacle2,obstacle3,obstacle4,obstacle5,obstacle6;
    var obstacles;
    var score;
    var cloudGroup,obstacleGroup;
    var gameOverImage,gameOver;
    var restartImage,restart;
    var trexcollider;
    var dieSound;
    var jumpSound;
    var checkpointSound;

function preload(){
    trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
      groundImage = loadImage("ground2.png")
      cloudimage= loadImage("cloud.png")
      obstacle1=loadImage("obstacle1.png");
      obstacle2=loadImage("obstacle2.png");
      obstacle3=loadImage("obstacle3.png");
      obstacle4=loadImage("obstacle4.png");
      obstacle5=loadImage("obstacle5.png");
      obstacle6=loadImage("obstacle6.png");
      gameOverImage=loadImage("gameOver.png");
      restartImage=loadImage("restart.png");
      trexcollider=loadImage("trex_collided.png");
      dieSound=loadSound("die.mp3");
      checkpointSound=loadSound("checkPoint.mp3");
      jumpSound=loadSound("jump.mp3");
}

function setup(){
  createCanvas(600,200);
  
        // creating trex
        trex = createSprite(50,160,20,50);
        trex.addAnimation("running", trex_running);
        edges = createEdgeSprites();
        trex.addAnimation("trex_collided",trexcollider);
  
        //creating ground
        ground2=createSprite(300,180,600,20)
        ground2.addImage("groundImage",groundImage);
        
        //adding scale and position to trex
        trex.scale = 0.5;
        trex.x = 50
        trex.debug=false;
        trex.setCollider("rectangle",0,0,50,50);
   
        //Creating one more ground(invisible ground)
        invisibleground=createSprite(300,190,600,10)
        invisibleground.visible=false;
  
        //score
        score=0;
        
  
        //gameOver
        gameOver=createSprite(300,100,20,20);
        gameOver.addImage("gameOverImage",gameOverImage);
        gameOver.visible=false;
  
        //restart
        restart=createSprite(300,150,20,20);
        restart.addImage("restartImage",restartImage);
        restart.scale=0.6
        restart.visible=false;
  
        cloudGroup= new Group();
        obstacleGroup= new Group();
}
function draw(){
        //set background color 
        background("white");
        text("Score:"+score,520,20);
        //stop trex from falling down
        trex.collide(invisibleground)
        drawSprites();

        if (GameState===Play){
        //jump when space key is pressed
        if(keyDown("space")&&(trex.y>161)){
          trex.velocityY = -11;
          jumpSound.play();
        }
          
          //making ground faster
          ground2.velocityX=-(6+score/500)
          
        //logging the y position of the trex
        //console.log(frameCount);
         trex.velocityY = trex.velocityY + 0.5;

        //stop trex from falling down
        if(ground2.x<0){
        ground2.x=ground2.width/2
        }
        //trex bounceoff edges
        trex.bounceOff(edges);
        creatingClouds();
        creatingObstacles();   
        score=score+Math.round(frameCount/100);
  
        if (score%500===0&& score>0){
          checkpointSound.play();
        }
        if (trex.isTouching(obstacleGroup)){
        GameState=End
        dieSound.play();
        }
        }
  
        else if (GameState===End){
        ground2.velocityX=0;
        trex.velocityY=0;            
        obstacleGroup.setVelocityXEach(0);
        cloudGroup.setVelocityXEach(0) 
        trex.changeAnimation("trex_collided",trexcollider);
        obstacleGroup.setLifetimeEach(-1);
        cloudGroup.setLifetimeEach(-1);
        restart.visible=true;
        gameOver.visible=true;
        
          if (mousePressedOver(restart)){
            reset();
          }
        }
        console.log(GameState)
        } 
    

function creatingClouds(){
      //creatingclouds    
      if (frameCount%50===0){
      cloud=createSprite(600,70,30,10);
      cloud.addImage("cloudimage",cloudimage);
      cloud.scale=0.1
      cloud.velocityX=-5 
      cloud.y=Math.round(random(20,100))
      //console.log(trex.depth);
      //console.log(cloud.depth);
      trex.depth=cloud.depth+1
      cloud.lifetime=120;
      
        cloudGroup.add(cloud);
      }
      }

function creatingObstacles(){
  //creatingObstacles
  if (frameCount%100===0){
  obstacles=createSprite(600,165,30,20);
  obstacles.velocityX=-(6+score/500);
  //create random obstacles
    var number= Math.round(random(1,6));
    switch(number){
    case 1: obstacles.addImage("obstacle1",obstacle1);
    break;
    case 2: obstacles.addImage("obstacle2",obstacle2);             break;
    case 3: obstacles.addImage("obstacle3",obstacle3);
    break;
    case 4: obstacles.addImage("obstacle4",obstacle4);
    break;
    case 5: obstacles.addImage("obstacle5",obstacle5);
    break;
    case 6: obstacles.addImage("obstacle6",obstacle6);
    break;
    default:break
    }
    obstacles.scale=0.7
    obstacles.lifetime=120
        
    obstacleGroup.add(obstacles);
    }
    }
   
  function reset(){
    GameState=Play;
    console.log("restart");
    obstacleGroup.destroyEach();
    cloudGroup.destroyEach();
    gameOver.visible=false
    restart.visible=false
    trex.changeAnimation("running",trex_running);
    score=0;
  }
  