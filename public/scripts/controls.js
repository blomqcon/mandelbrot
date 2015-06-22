window.onload = function() {
	webGLStart();
	document.getElementById("update").onclick = setLocation;
};

function setLocation() {
	var xCenter = parseFloat(document.getElementById("xCenter").value);
	var yCenter = parseFloat(document.getElementById("yCenter").value);
	var zoom = parseFloat(document.getElementById("zoom").value);
	//setZoom(-.5, 0, .4);
    //setZoom(-0.7, 0, 1.4);
    //setZoom(0.3750001200618655, -0.2166393884377127, 0.1)

	drawScene(vertexPositionBuffer, xCenter, yCenter, zoom);
}