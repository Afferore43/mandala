class Mandala{
  constructor(w, h) {
    this.w = w;
    this.h = h;
    
    this.shapes = [];
    
    this.imageBuffer = createGraphics(w, h);
    this.scl = 1.0;
    
    this.mirror = true;
    this.subdivisions = 4;
    this.color = [255, 255, 255, 255];
    
    this.strokeSize = 1;
    
    this.saveWithBackground = false;
    this.backgroundColor = [31, 31, 31];
    this.redrawShapesToBuffer();
  }
  
  currentShape() {
    return this.shapes.length == 0 ? undefined : this.shapes[this.shapes.length - 1];
  }
  
  drawMandalaShape(graph, arr, subs, mirror, color, strokeSize) {
    graph.noFill();
    graph.strokeWeight(strokeSize);
    graph.stroke(color[0], color[1], color[2], color[3]);
    
    graph.push();
    graph.translate(this.w / 2, this.h / 2);
  
    for(let i = 0; i < subs; i++) {
      graph.rotate(PI * 2 / subs);
    
      graph.beginShape();
      for(let j = 0; j < arr.length; j++) {
        graph.vertex(arr[j][0], arr[j][1]);
      }
      graph.endShape();
    
      if(mirror != false) {
        graph.beginShape();
        for(let j = 0; j < arr.length; j++) {
          graph.vertex(arr[j][0], -arr[j][1]);
        }
        graph.endShape();
      }
    }
  
    graph.pop();
  }
  
  drawMandalaShapeToCanvas(arr, subs, mirror, color, strokeSize) {
    noFill();
    let scl = this.scl;
    strokeWeight(strokeSize * scl);
    stroke(color[0], color[1], color[2], color[3]);
    
    push();
    translate(width / 2, height / 2);
    for(let i = 0; i < subs; i++) {
      rotate(PI * 2 / subs);
    
      beginShape();
      for(let j = 0; j < arr.length; j++) {
        vertex(arr[j][0] * scl, arr[j][1] * scl);
      }
      endShape();
    
      if(mirror != false) {
        beginShape();
        for(let j = 0; j < arr.length; j++) {
          vertex(arr[j][0] * scl, -arr[j][1] * scl);
        }
        endShape();
      }
    }
  
    pop();
  }
  
  addPointToCurrentShape(x, y) {
    let c = this.currentShape();
    if(c) c.points.push([x / this.scl, y / this.scl]);
  }
  
  removeAllShapes() {
    this.shapes = [];
    this.redrawShapesToBuffer();
  }
  
  removeLastShape() {
    this.shapes.pop();
    this.redrawShapesToBuffer();
  }
  
  copyColor() {
    let c = [];
    for(let rgb of this.color) c.push(rgb);
    return c;
  }
  
  newShape() {
    this.drawCurrentShapeToBuffer();
    this.shapes.push({points : [], subdivisions : this.subdivisions, mirror : this.mirror, color : this.copyColor(), strokeSize: this.strokeSize});
  }
  
  drawCurrentShapeToBuffer() {
    let s = this.currentShape();
    if(s) this.drawMandalaShape(this.imageBuffer, s.points, s.subdivisions, s.mirror, s.color, s.strokeSize);
  }
  
  redrawShapesToBuffer() {
    // draw all shapes except current to image buffer
    this.imageBuffer.clear();
    this.imageBuffer.background(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
    for(let i = 0; i < this.shapes.length - 1; i++) {
      let s = this.shapes[i];
      this.drawMandalaShape(this.imageBuffer, s.points, s.subdivisions, s.mirror, s.color, s.strokeSize);
    }
  }
  
  drawCurrentAndBufferToCanvas() {
    clear();
    stroke(0);
    strokeWeight(1);
    // draw image buffer and current shape to canvas
    image(this.imageBuffer, width / 2 - this.w * this.scl / 2, height / 2 - this.h * this.scl / 2, this.w * this.scl, this.h * this.scl);
    let current = this.currentShape();
    if(current) this.drawMandalaShapeToCanvas(current.points, current.subdivisions, current.mirror, current.color, current.strokeSize);
  }
  
  saveMandala() {
    this.imageBuffer.clear();
    if(this.saveWithBackground) this.imageBuffer.background(this.backgroundColor[0], this.backgroundColor[1], this.backgroundColor[2]);
    for(let i = 0; i < this.shapes.length; i++) {
      let s = this.shapes[i];
      this.drawMandalaShape(this.imageBuffer, s.points, s.subdivisions, s.mirror, s.color, s.strokeSize);
    }
    save(this.imageBuffer, "mandala.png");
  }
  
  
}