var c;
var mandelbrot;

window.onload = function() {
  c = document.getElementById('canvas');
  mandelbrot = mandelbrotAsm;
  frame(1, 100);
  //mandelbrot.draw(c,  -1.25066, 0.02012,  .00017);
}

function frame(zoom, nextFrame) {
  setTimeout(function() {
  mandelbrot.draw(c,  -1.25066, 0.02012,  zoom);
  console.log(zoom);
  frame(zoom * .8, nextFrame);
  }, nextFrame);
}