var gl;
var shaderProgram;
var aVertexPosition;
var vertexPositionBuffer;

var aZoom;

var currentXCenter;
var currentYCenter;
var currentZoom;


function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initShaders(gl, shaderProgram, aVertexPosition);
    
    vertexPositionBuffer = initVertexBuffer(gl, vertexPositionBuffer);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    drawScene(vertexPositionBuffer, -0.7, 0, 2.4);
    //setInterval(function(){ drawScene(vertexPositionBuffer, -0.7, 0, zoom2); }, 16); //60 Frames per second
}

function drawScene(vertexPositionBuffer, x, y, z) {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //clears the color and depth buffers
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	gl.vertexAttribPointer(aVertexPosition, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	var aZoomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aZoomBuffer);
    
    setZoom(x, y, z);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(zoom), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aZoom, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
	gl.deleteBuffer(aZoomBuffer);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    
    currentXCenter = x;
    currentYCenter = y;
    currentZoom = z;
    
    updateCurrent();
}

function setZoom(xCenter, yCenter, zoom) {
	var canvas = document.getElementById("canvas");
	var x = canvas.width;
	var y = canvas.height;
	var ASPECT_RATIO = y/x;
	
	var left = (-1*zoom) + xCenter;
	var right = (1*zoom) + xCenter;
	var up = (ASPECT_RATIO*zoom) + yCenter;//original ratio 0.827586
	var down = (-ASPECT_RATIO*zoom) + yCenter;
	setScale(left, right, up, down);
}

function setScale(left, right, up, down) {
	zoom = [
    	right,  up,
    	left,  up,
    	 right, down,
    	left, down
	];
}

