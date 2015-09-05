var global = this;

var mandelbrotAsm = (function() {
  function draw(canvas, xCenter, yCenter, zoom) {
    var width = canvas.width;
    var height = canvas.height;
    
    var context2D = canvas.getContext('2d');
    context2D.clearRect(0, 0, width, height);
    var imageData = context2D.createImageData(width, height);
    var data = imageData.data;
    
    var buffer = new ArrayBuffer(16 * 1024 * 1024);
    var data = new Uint8ClampedArray(buffer);
    var m = asmPixelGenerator(global, {}, buffer);
    
    m.generateMandelbrot(width, height, xCenter, yCenter, zoom, 500);
    
    for(var i = 0; i < 512*512*4; i++) {
      imageData.data[i] = data[i];
    }
    
    context2D.putImageData(imageData, 0, 0);
  }
  
  function asmPixelGenerator(global, imports, buffer) {
  "use asm";
  
  var floor = global.Math.floor;
  var abs = global.Math.abs;
  
  var heap = new global.Uint8Array(buffer);
  
	var width = 0;
  var height = 0;
  var ASPECT_RATIO = 0.0;
  var xCenter = 0.0;
  var yCenter = 0.0;
  var zoom = 0.0
  
  function generateMandelbrot(w, h, xCen, yCen, z, iterations) {
    w = w | 0;
    h = h | 0;
    xCen = +(xCen);
    yCen = +(yCen);
    z = +(z);
    iterations = iterations | 0;
    
    var dataIndex = 0;
    var x = 0;
    var y = 0;
    var xPx = 0.0;
    var yPx = 0.0;
    var hue = 0.0;
    
    width = w | 0;
    height = h | 0;
    xCenter = +(xCen);
    yCenter = +(yCen);
    zoom = +(z);
    ASPECT_RATIO = ((+(height|0)) / (+(width|0)));
    
    //Optimization: calculate xPx, yPx only once.
    for (y = 0; (y | 0) < (height | 0); y = (y + 1) | 0) {
      for (x = 0; (x | 0) < (width | 0); x = (x + 1) | 0) {
        xPx = getPixelCord(x, width, xCenter, 1.0);
        yPx = getPixelCord(y, height, yCenter, -ASPECT_RATIO);
        hue = calulatePixelHue(xPx, yPx);
        
        hsvToRGBInBuffer(+(hue), 1.0, 0.9, (dataIndex|0));
        dataIndex = (dataIndex + 4) | 0;
      }
    }
  }
  
  function getPixelCord(v, size, center, ratio) {
    v = v|0;
    size = size|0;
    center = +center;
    ratio = +ratio;
    
    var per = 0.0;
    var scaled = 0.0
    var loc = 0.0;
    
    per = (((+(v|0)) - ((+(size|0)) / 2.0)) / (+(size|0)));
    scaled = abs(+(((-ratio * zoom) + center) - ((ratio * zoom) + center)));
    loc = center + (scaled * per);
    return loc;
  }

  
  function calulatePixelHue(c_a, c_b) {
    c_a = +c_a;
    c_b = +c_b;
    
    var z_a = 0.0;
    var z_b = 0.0;
    var z_a_temp = 0.0;
    var z_b_temp = 0.0;
    
    var divergeScale = 0.0;
    var diverge = 0;
    var i = 0;
    
    //High diverge value - diverges slowly
    //Low  diverge value - diverges quickly
    for (i = 0; (i | 0) < (1000 | 0); i = (i + 1) | 0) {
          z_a_temp = +z_a;
          z_b_temp = +z_b;
          z_a = +((z_a_temp * z_a_temp) - (z_b_temp * z_b_temp) + c_a);
          z_b = +((2.0 * (z_a_temp * z_b_temp)) + c_b);

          if(((z_a * z_a) + (z_b * z_b)) > 500.0) {
            diverge = i|0;
            break;
          }
    }
    
    if(diverge == 0) {
      return 0.0;
    } else {
      divergeScale = +(1.0 - ((+(diverge|0)) / 800.0));
      return +(+divergeScale / 0.05);
    }
  }
  
  function hsvToRGBInBuffer(h, s, v, index) {
      h = +h;
      s = +s;
      v = +v;
      index = index|0;
      var r = 0.0, g = 0.0, b = 0.0;
      var f = 0.0, p = 0.0, q = 0.0, t = 0.0;
      var i = 0;
      
      i = floor(h * 6);
      f = (h * 6) - i;
      p = v * (1 - s);
      q = v * (1 - (f * s));
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
      }
      if(h === 0.0) {
        heap[(index + 0) << 1 >> 1] = 0;
        heap[(index + 1) << 1 >> 1] = 0;
        heap[(index + 2) << 1 >> 1] = 0;
        heap[(index + 3) << 1 >> 1] = 255;
      } else {
        heap[(index + 0) << 1 >> 1] = floor(r * 255.0);
        heap[(index + 1) << 1 >> 1] = floor(g * 255.0);
        heap[(index + 2) << 1 >> 1] = floor(b * 255.0);
        heap[(index + 3) << 1 >> 1] = (255);
      }
  }
  
  return {generateMandelbrot:generateMandelbrot};
}
  
  
  
  return {
    draw: draw
  };
})();
        