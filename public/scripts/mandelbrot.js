window.onload = function() {
	webGLStart();
};

var gl;
var shaderProgram;
var aVertexPosition;

var aZoom;
var zoomBuffer;

var zoom = [
	0.7,  1.2,
	-2.2,  1.2,
	 0.7, -1.2,
	-2.2, -1.2
];

function webGLStart() {
    var canvas = document.getElementById("canvas");
    initGL(canvas);
    initShaders(gl, shaderProgram, aVertexPosition);
    
    var vertexPositionBuffer = initVertexBuffer(gl, vertexPositionBuffer);
    
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    drawScene(vertexPositionBuffer);
    //setInterval(function(){ drawScene(vertexPositionBuffer); }, 16); //60 Frames per second
}

function drawScene(vertexPositionBuffer) {
	gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT); //clears the color and depth buffers
	
	gl.bindBuffer(gl.ARRAY_BUFFER, vertexPositionBuffer);
	gl.vertexAttribPointer(aVertexPosition, vertexPositionBuffer.itemSize, gl.FLOAT, false, 0, 0);
	
	
	var aZoomBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, aZoomBuffer);
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(zoom), gl.STATIC_DRAW);
    gl.vertexAttribPointer(aZoom, 2, gl.FLOAT, false, 0, 0);

	gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
	
	//gl.deleteBuffer(aZoomBuffer);
    //gl.clearColor(0.0, 0.0, 0.0, 1.0);
}