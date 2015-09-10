var c;
var mandelbrot;

window.onload = function() {
  c = document.getElementById('canvas');
  mandelbrot = mandelbrotAsm;
  mandelbrot.init(c);
  //frame(1, 250);
  //mandelbrot.draw(-1.25066, 0.02012,  .00017);
  mandelbrot.draw(-0.75, 0.0, 1.5);
  
  /*zoom = 0.01;
  var startNext = true;
  setInterval(function() {  
    if(startNext) {
      startNext = false;
      mandelbrot.draw(-1.25066, 0.02012,  zoom);
      zoom = zoom * 0.8;
      startNext = true;
    }
  }, 500);*/
  
}

/*function frame(zoom, nextFrame) {
  setTimeout(function() {
  mandelbrot.draw(c,  -1.25066, 0.02012,  zoom);
  console.log(zoom);
  frame(zoom * .8, nextFrame);
  }, nextFrame);
}
*/
