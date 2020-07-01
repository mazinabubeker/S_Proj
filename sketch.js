var canvasSize = 800;
var numLines = 1;
var spacing = canvasSize/numLines;
var frame = 1;



function setup(){
  createCanvas(canvasSize, canvasSize);
  background(100);
  stroke(255);
}

function draw(){
  frame++;
  if(frame%4==0){

    background(100);
    for(var i = 0; i < numLines; i++){
      line(0, i*spacing,  i*spacing, canvasSize);
      line(i*spacing, 0 ,  canvasSize, i*spacing);
    }
    numLines++;
    spacing = canvasSize/numLines
  }

}
