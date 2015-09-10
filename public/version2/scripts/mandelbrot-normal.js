var mandelbrotNormal = (function() {
  function draw(canvas, xCenter, yCenter, zoom) {
    var width = canvas.width;
    var height = canvas.height;
    
    var context2D = canvas.getContext('2d');
    //context2D.clearRect(0, 0, width, height);
    var imageData = context2D.createImageData(width, height);
    var data = imageData.data;
    
    var dataIndex = 0;
    //console.log(calulatePixel(-1.0, 0.5));
    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        var px = getPixel(x, y, width, height, xCenter, yCenter, zoom);
        var mandel = calulatePixel(px.x, px.y);
        var rgb = HSVtoRGB(mandel[0], mandel[1], mandel[2]);
        
        data[dataIndex + 0] = rgb.r;
        data[dataIndex + 1] = rgb.g;
        data[dataIndex + 2] = rgb.b;
        data[dataIndex + 3] = 255;
        dataIndex += 4;
      }
    }
    context2D.putImageData(imageData, 0, 0);
  }
  
  function calulatePixel(c_a, c_b) {
    var z_a = 0.0;
    var z_b = 0.0;
    var z_a_temp = 0.0;
    var z_b_temp = 0.0;
    
    var diverge = 0;
    
    //High diverge value - diverges slowly
    //Low  diverge value - diverges quickly
    for(var i = 0; i < 1000; i++) {
          z_a_temp = z_a;
          z_b_temp = z_b;
          z_a = (z_a_temp * z_a_temp) - (z_b_temp * z_b_temp) + c_a;
          z_b = 2.0 * (z_a_temp * z_b_temp) + c_b;

          if(((z_a * z_a) + (z_b * z_b)) > 500.0) {
            diverge = i;
            break;
          }
    }
    
    if(diverge == 0) {
      return [0.0, 0.0, 0.0];
    } else {
      //TODO: Implement normalized iteration count algorithm for smoother colors
      var divergeScale = 1.0 - ((diverge) / 800.0);
      //return [divergeScale, divergeScale, divergeScale, 1.0];
      return [divergeScale / 0.05, 1.0, 0.9];
    }
  }
  
  function getPixel(x, y, width, height, xCenter, yCenter, zoom) {
    var result = {};
    result.x = ((x - (width / 2)) / width);
    result.y = ((y - (height / 2)) / height);
    var ASPECT_RATIO = height / width;
    
    var width = Math.abs(((-1 * zoom) + xCenter) - ((1 * zoom) + xCenter));
    var height = Math.abs(((ASPECT_RATIO * zoom) + yCenter) - ((-ASPECT_RATIO * zoom) + yCenter));
    var xLoc = xCenter + (width * result.x);
    var yLoc = yCenter + (height * -result.y);
    return {x: xLoc, y: yLoc};
  }
  
  
   function HSVtoRGB(h, s, v) {
      var r, g, b, i, f, p, q, t;
      if (arguments.length === 1) {
          s = h.s, v = h.v, h = h.h;
      }
      i = Math.floor(h * 6);
      f = h * 6 - i;
      p = v * (1 - s);
      q = v * (1 - f * s);
      t = v * (1 - (1 - f) * s);
      switch (i % 6) {
          case 0: r = v, g = t, b = p; break;
          case 1: r = q, g = v, b = p; break;
          case 2: r = p, g = v, b = t; break;
          case 3: r = p, g = q, b = v; break;
          case 4: r = t, g = p, b = v; break;
          case 5: r = v, g = p, b = q; break;
      }
      return {
          r: Math.round(r * 255),
          g: Math.round(g * 255),
          b: Math.round(b * 255)
      };
  }
  
  
  
  return {
    draw: draw
  };
})();
		
        
        