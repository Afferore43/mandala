let cnv, gui;

let mandala;

let drawing = true;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.position(0,0);
  
  mandala = new Mandala(2000, 2000);
  
  gui = new dat.GUI();
  
  let viewgui = gui.addFolder("view");
  viewgui.add(mandala, 'scl').min(0.3).max(4).step(0.1).onChange(() => mandala.redrawShapesToBuffer());
  
  let brush = gui.addFolder("brush");
  
  brush.add(mandala, 'subdivisions').min(1).max(32).step(1);
  brush.add(mandala, 'mirror');
  brush.add(mandala, 'strokeSize').min(0.1).max(200).step(0.1);
  brush.addColor(mandala, 'color');
  
  let guifile = gui.addFolder("file");
  guifile.addColor(mandala, 'backgroundColor').onChange(() => mandala.redrawShapesToBuffer());
  
  guifile.add(mandala, 'removeAllShapes').name("new mandala");
  guifile.add(mandala, 'removeLastShape').name("undo");
  guifile.add(mandala, 'saveWithBackground');
  guifile.add(mandala, 'saveMandala');
}

function draw() {
  mandala.drawCurrentAndBufferToCanvas();
  if(drawing) mandala.addPointToCurrentShape(mouseX - width / 2, mouseY - height / 2);
}

function mouseReleased() {
  drawing = false;
}

function mousePressed() {
  if(event.toElement == cnv.elt) {
    drawing = true;
    mandala.newShape();
  }
}
function keyPressed() {
  switch(event.key) {
    case "s":
      mandala.saveMandala();
      break;
    case "n":
      mandala.removeAllShapes();
      break;
  }
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}