var balloon,background;
var database;
var position;

function preload(){
  backgroundImg=loadImage("images/1.png");
  balloonImage=loadImage("images/2.png")
}

function setup() {
  database=firebase.database
  createCanvas(800,400);
  balloon=balloonImage;
  balloon.scale=0.5
  var balloonPosition=database.ref('balloon/position')
  balloonPosition.on("value",readPosition,showError)
}

function draw() {
  background(backgroundImg); 

  if(position!==undefined){
  
  if(keyDown(LEFT_ARROW)){
    balloon.x=balloon.x-10
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.x=balloon.x+10
  }
  else if(keyDown(UP_ARROW)){
    balloon.y=balloon.y-10
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.y=balloon.y+10
  }
}
  drawSprites();
}
function changePosition(x,y){
  balloon.x = balloon.x + x;
  balloon.y = balloon.y + y;
}
function readPosition(data){
  position=data.val()
  balloon.x=position.x
  balloon.y=position.y
}
function writePosition(x,y){
database.ref('balloon/position').set({
  "x":position.x+x,
  "y":position.y+y
})
}
function showError(){
console.log("Error in writing to the database")
}