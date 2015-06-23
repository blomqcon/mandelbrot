window.onload = function() {
	webGLStart();
	var canvas = document.getElementById("canvas");
	document.getElementById("canvas").addEventListener("wheel", scrollWheelZoom);
	document.getElementById("update").addEventListener("click", setLocation);
	canvas.addEventListener('mousemove', showCoordinates);
	//document.getElementById("update").onclick = setLocation;
};

function updateCurrent() {
	document.getElementById("currentXCenter").innerHTML = currentXCenter;
	document.getElementById("currentYCenter").innerHTML = currentYCenter;
	document.getElementById("currentZoom").innerHTML = currentZoom;
}

function showCoordinates(e) {
	var canvas = document.getElementById("canvas");
	var can_x = canvas.width;
	var can_y = canvas.height;
	var ASPECT_RATIO = can_y/can_x;

	var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
    x = ((x - (canvas.width / 2)) / canvas.width);
    y = ((y - (canvas.height / 2)) / canvas.height);
	
    var width = Math.abs(((-1 * currentZoom) + currentXCenter) - ((1 * currentZoom) + currentXCenter));
	var height = Math.abs(((ASPECT_RATIO * currentZoom) + currentYCenter) - ((-ASPECT_RATIO * currentZoom) + currentYCenter));
	var xLoc = currentXCenter + (width * x);
	var yLoc = currentYCenter + (height * -y);
	
	document.getElementById("cursonPosX").innerHTML = xLoc;
	document.getElementById("cursonPosY").innerHTML = yLoc;
}


function setLocation() {
	var xCenter = parseFloat(document.getElementById("xCenter").value);
	var yCenter = parseFloat(document.getElementById("yCenter").value);
	var zoom = parseFloat(document.getElementById("zoom").value);
	//setZoom(-.5, 0, .4);
    //setZoom(-0.7, 0, 1.4);
    //setZoom(0.3750001200618655, -0.2166393884377127, 0.1)

	drawScene(vertexPositionBuffer, xCenter, yCenter, zoom);
}

function scrollWheelZoom(e) {
	var scrollIn = isScrollIn(e);
	var mouseLoc = getMouseLocation(e);
	
	var canvas = document.getElementById("canvas");
	var can_x = canvas.width;
	var can_y = canvas.height;
	var ASPECT_RATIO = can_y/can_x;
	
	var width = Math.abs(((-1 * currentZoom) + currentXCenter) - ((1 * currentZoom) + currentXCenter));
	var height = Math.abs(((ASPECT_RATIO * currentZoom) + currentYCenter) - ((-ASPECT_RATIO * currentZoom) + currentYCenter));
	var xLoc = currentXCenter + (width * mouseLoc.x);
	var yLoc = currentYCenter + (height * -mouseLoc.y);
	
	var x = (currentXCenter * 0.8) + (xLoc * 0.2);
	var y = (currentYCenter * 0.8) + (yLoc * 0.2);
	var z = currentZoom;
	if(scrollIn) {
		z = z / 1.1;
	} else {
		z = z * 1.1;
	}
	
	
	//alert(x + " " + y + " " + z);
	drawScene(vertexPositionBuffer, x, y, z);
}

function isScrollIn(e) {
	var e = window.event || e; // old IE support
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	
	return delta === 1;
}

function getMouseLocation(e) {
	var canvas = document.getElementById("canvas");

	var x;
    var y;
    if (e.pageX || e.pageY) {
        x = e.pageX;
        y = e.pageY;
    }
    else {
        x = e.clientX + document.body.scrollLeft +
            document.documentElement.scrollLeft;
        y = e.clientY + document.body.scrollTop +
            document.documentElement.scrollTop;
    }
    x -= canvas.offsetLeft;
    y -= canvas.offsetTop;
    
    x = ((x - (canvas.width / 2)) / canvas.width);
    y = ((y - (canvas.height / 2)) / canvas.height);
    
    return {x: x, y: y};
}