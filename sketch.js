var balloon,balloonImage1,balloonImage2;
var Height;
var balloonHeight;
// create database and position variable here

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
   balloonImage2=loadAnimation("hotairballoon1.png","hotairballoon1.png",
   "hotairballoon1.png","hotairballoon2.png","hotairballoon2.png",
   "hotairballoon2.png","hotairballoon3.png","hotairballoon3.png","hotairballoon3.png");
  }

//Function to set initial environment
function setup() {
  database=firebase.database();
  createCanvas(1500,700);


  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);

  balloon.scale=0.5;
   balloonHeight=database.ref('balloon/height')
  balloonHeight.on("value",readHeight,showError);

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);
  fill(0);
  stroke("white");
  textSize(25);
  text("Use arrow keys to move Hot Air Balloon!",40,40);
  

  if(keyDown(LEFT_ARROW)){
    updateHeight(-10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
    
  }
  else if(keyDown(RIGHT_ARROW)){
    updateHeight(10,0);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
    
  }
  else if(keyDown(UP_ARROW)){
    updateHeight(0,-10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
    balloon.scale=balloon.scale-0.005;
    
  }
  else if(keyDown(DOWN_ARROW)){
    updateHeight(0,10);
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
    balloon.scale=balloon.scale+0.005;
    
  }

  drawSprites();
  

}
function updateHeight(x,y){
database.ref('balloon/height').set({
'x':Height.x+x,
'y':Height.y+y
})
}

function readHeight(data){
Height=data.val();
balloon.x=Height.x;
balloon.y=Height.y;
}
function showError(){
console.log("error in pushing the data into database");
}