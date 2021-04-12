var soilder,soImage;
var line1;
var line2;
var buImage;

var co,co1,co2,co3;

var enemeysGroup;
var gunGroup;

var PLAY=1
var END=0
var gameState=1 

var score=0;
var lifeTime=3;

var smearth,eImage;
var baearth,Searth;

var gm,gameoverImage
var re,restartImage

var bg;



function preload(){
  
  soImage=loadImage("istockphoto-1088473190-612x612.jpg");
  
  buImage=loadImage("bullet(1).jpg");
  
  co=loadImage("7-scary-coronavirus-cartoon-clipart.jpg");
  
  co1=loadImage("cartoon-coronavirus-vector-29374139.jpg")
  
  co2=loadImage("istockphoto-1204349263-170667a.jpg");
  
  co3=loadImage("th (20).jpg");
  
  eImage=loadImage("4153779_1.jpg");
  Searth=loadImage("flat,550x550,075,f.u3.jpg");
  
  gameoverImage=loadImage("2807e5cc1c37d652148a6697c700c5c4.jpg");
  
  restartImage=loadImage("theee (5).jpg");
  
  bg=loadImage("war-background-2.jpg");
}



function setup() {
  createCanvas(windowWidth,windowHeight);
  
  soilder=createSprite(150,200,30,30);
  soilder.addImage("image",soImage);
  soilder.scale=0.2;
  
  smearth=createSprite(50,200,30,30);
  smearth.addImage("image",eImage);
  smearth.scale=0.1
  smearth.velocityY=-(4+3*score/7);
  
  gm=createSprite(width/2,height/4);
  gm.addImage("image",gameoverImage)
  gm.scale=0.2
  
  re=createSprite(width/2,height/2);
  re.addImage("image",restartImage)
  re.scale=0.2
  
  re.visible=false
  gm.visible=false
  
 
  line1=createSprite(300,380,1000,20);
  line2=createSprite(300,0,1000,20);
  
  line1.visible=false
  line2.visible=false
  
  
 
  enemeysGroup=new Group();
  gunGroup = new Group();
 
}

function draw() {
  background(bg);
  
  
  if(gameState===PLAY){
    
    soilder.y=mouseY
    
    if(touches.length>0||keyDown("space")){
      
      
      ammo();
      touches=[0]
      
    } 
    
    if(enemeysGroup.isTouching(gunGroup)){
      
      enemeysGroup[0].destroy();
      gunGroup.destroyEach();
      score=score+1 
      
    }
   
    if(enemeysGroup.isTouching(smearth)){
      
      enemeysGroup[0].destroy();
      gunGroup.destroyEach();
      
      gameState=END;
      
    }
    
   
    
  }else if(gameState===END){
    
    gm.visible=true
    re.visible=true
    
    enemeysGroup.destroyEach();
    
   smearth.velocityY=0
    
      if(mousePressedOver(re)){
        
        reset();
        
      }
      
    if(touches.length>0){
      
    reset();
      touches=[0]
    }
      
    }
    
  
  
  
  

soilder.collide(line1);
soilder.collide(line2);
  
  smearth.bounceOff(line2);
  smearth.bounceOff(line1)
  
   virus();
  
  
  drawSprites();
  
  fill("white");
  textSize(20)
  text("score :"+score,width/2,height/14);
  
}

function virus(){
  if(frameCount%200 ===0){
   var corona=createSprite(width+200,300,40,40)
    corona.velocityX=-(4+3*score/7);
    corona.scale=0.1;
    corona.y=Math.round(random(350,50))
    
    var rand =Math.round(random(1,4));
    switch(rand){
        
      case 1: corona.addImage(co);
        break;
      case 2: corona.addImage(co1);
        break;
      case 3: corona.addImage(co2);
        break;
      case 4: corona.addImage(co3);
        break;
        default:break;
        
        
        
    }
    
    enemeysGroup.add(corona);
    corona.lifetime=380
    
    
  }
  
}

function ammo(){
  
  var bullet=createSprite(150 ,100,60,60);
  bullet.addImage(buImage);
  bullet.x=190
  bullet.y=soilder.y
  bullet.velocityX=6
  bullet.scale=0.1;
  bullet.lifetime=380
  gunGroup.add(bullet);
  return bullet;
  
  
  
}


function reset(){
  
   smearth.velocityY=-4
  gameState=PLAY;
  
  
  re.visible=false
  gm.visible=false
  
  
  score=0
  
}