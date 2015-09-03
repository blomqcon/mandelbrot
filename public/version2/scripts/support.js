var support = (function() {
  function simd() {
    if(typeof(SIMD) !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
  
  function web_workers() {
    if(typeof(Worker) !== "undefined") {
      return true;
    } else {
      return false;
    }
  }
  
  function webgl_single() {
    var canvas = document.createElement("canvas");
    gl = canvas.getContext("experimental-webgl");
    console.log(gl.getParameter(gl.VERSION));
    console.log(gl.getParameter(gl.SHADING_LANGUAGE_VERSION));
    console.log(gl.getParameter(gl.VENDOR));
  }
  
  function webgl_double() {
    var canvas = document.createElement("canvas");
    gl = canvas.getContext("experimental-webgl");
    // try to get the extensions
    var ext = gl.getExtension("WEBGL_debug_renderer_info");

    // if the extension exists, find out the info.
    if (ext) {
      console.log(gl.getParameter(ext.UNMASKED_VENDOR_WEBGL));
      console.log(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL));
    }
  }
  
  return {
    simd: simd,
    web_workers: web_workers,
    webgl_single: webgl_single,
    webgl_double: webgl_double,
  };
})();

