function setup(){
  
}

const sketch = function(p) {
  p.setup = function () {
    createCanvas(600,600)
  }

  p.draw = function () {
    ellipse(50, 50, 80, 80);
  }

  
}



new p5(sketch, 'drawing');
