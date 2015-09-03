var mandelbrotNormal = (function() {
  function draw(canvas) {
    var width = canvas.width;
    var height = canvas.height;
    console.log(width + ' x ' + canvas.height);
    
    var context2D = canvas.getContext('2d');
    context2D.clearRect(0, 0, width, height);
    var imageData = context2D.createImageData(512, 512);
    var data = imageData.data;
    
    var dataIndex = 0;
    for(var y = 0; y < 512; y++) {
      for(var x = 0; x < 512; x++) {
        var px = normalize(x, y, 0, 0, 2);
        var mandel = calulatePixel(px.x, px.y);
        var rgb = HSVtoRGB(mandel[0], mandel[1], mandel[2]);
        
        data[dataIndex + 0] = rgb.r;
        data[dataIndex + 1] = rgb.g;
        data[dataIndex + 2] = rgb.b;
        /*data[dataIndex + 0] = mandel[0] * 255;
        data[dataIndex + 1] = mandel[1] * 255;
        data[dataIndex + 2] = mandel[2] * 255;*/
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
    for(var i = 0; i < 500; i++) {
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
			//vec3 color = hsv2rgb(vec3(divergeScale / 0.05, 1.0, 0.9));
      //gl_FragColor = vec4(color, 1.0);
    }
  }
  
  function normalize(x, y, xCenter, yCenter, zoom) {
    var result = {};
    result.x = ((x - (512 / 2)) / 512);
    result.y = ((y - (512 / 2)) / 512);
    var ASPECT_RATIO = 512 / 512;
    
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
		
        
        