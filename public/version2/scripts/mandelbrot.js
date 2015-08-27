/*window.onload = function() {
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 800, 300);

  setInterval(function() {
    setRandom(ctx);
  }, 50);

}

function setRandom(ctx) {
  var px = ctx.createImageData(800, 300);
  var d = px.data;
  for(var x = 0; x < 800*300*4; x+=4) {
      d[x] = Math.random() * 255;
      d[x+1] = Math.random() * 255;
      d[x+2] = Math.random() * 255;
      d[x+3] = 255;
  }
  ctx.putImageData(px, 0, 0); 
}*/

function asmPixelGenerator(stdlib, imports, buffer) {
  "use asm";
	
  var sin = stdlib.Math.sin;
  var floor = stdlib.Math.floor;
  var toF = stdlib.Math.fround;
  
  var heap = new stdlib.Uint8Array(buffer);
	var seed = 1;
  
  function randomImage() {
    var i = 0;
  
    for(i = 0; i < 512 * 512 * 4; i = i + 1) {
      //heap[i << 1 >> 1] = +(+random() * 255.0);
      heap[i << 1 >> 1] = floor(+random() * 255.0);
    }
  }
	
  function random() {
    var x = 0.0;
    
    x = sin(+(seed|0)) * 10000.0;
    seed = seed + 1;
    return +(x - (+floor(x)));
  }
  
  return {randomImage:randomImage, random:random};
}



window.onload = function() {
  var c = document.getElementById('canvas');
  var ctx = c.getContext('2d');
  ctx.clearRect(0, 0, 512, 512);
  
  var buffer = new ArrayBuffer(2 * 1024 * 1024);
  var data = new Uint8ClampedArray(buffer);
  var m = asmPixelGenerator(this, null, buffer);
  m.randomImage();
  var px = ctx.createImageData(512, 512);
  var d = px.data;
  
  //Method 1
  /*var array =  Array.prototype.slice.call(data);
  array = array.slice(0, 4*512*512);
  var data2 = new Uint8ClampedArray(array);
  d.set(data2);*/
  
  //Method 2
  for(var i = 0; i < 512*512*4; i++) {
    d[i] = data[i];
  }
  
  ctx.putImageData(px, 0, 0); 
  
}



