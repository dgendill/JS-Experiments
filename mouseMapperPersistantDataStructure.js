// http://en.wikipedia.org/wiki/Persistent_data_structure
// http://en.wikipedia.org/wiki/Persistent_data_structure#Fat_Node
// Usage on Chrome:
// 1. copy and paste into console on jquery.com
// 2. move mouse around the page
// 3. run mouseMapper.graph()

// Data structure stores all previous values of the key
// and returns the most recent value 
function Structure(data) {
  // Fat Node
	this.data = {};
	for(var key in data) {
		this.data[key] = [data[key]];
	}
}
Structure.prototype.update = function(newData) {
	for(var key in newData) {
		if (this.data[key]) {
			this.data[key].push(newData[key]);
		}
	}
}
Structure.prototype.latest = function(key) {
	if (this.data[key] === undefined) { return; }
	
	var newestIndex = this.data[key].length;
	return this.data[key][newestIndex-1];
}

// Drawing Tool
function Drawer() {
	return this;
}
Drawer.prototype.line = function(x1,y1,x2,y2) {
	// returns a div element, absolutly positioned at
	// x1,y1 and styled as a line ending at x2,y2
  var length = Math.sqrt((x1-x2)*(x1-x2) + (y1-y2)*(y1-y2));
  var angle  = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
	var transform = 'rotate('+angle+'deg)';
	var line = document.createElement('div');
	line.style.position = "absolute";
	line.style.webkitTransform = transform;
	line.style.left = x1 + "px";
	line.style.top = y1 + "px";
	line.style.width = length + "px";
	line.style.height = "2px";
	line.style.background = "#f00";
	return line;
}

// Tracks mouse position on the page
function MouseMapper (x, y) {
	$('body').css({position:'relative'});
	return this;
}
MouseMapper.prototype = new Structure({x:0,y:0});
MouseMapper.prototype.graph = function() {
  // Draws lines between all points where
  // the mouse has been	
	var drawer = new Drawer();
	var body = document.getElementsByTagName('body')[0];
	body.style.position = "relative";
	for(var i = 0, l = this.data.x.length-1; i < l; i++) {
	  var x1 = this.data.x[i];
		var y1 = this.data.y[i];
		var x2 = this.data.x[i+1];
		var y2 = this.data.y[i+1];		
		body.appendChild(drawer.line(x1,y1,x2,y2));
	}
}

var mouseMapper = new MouseMapper(0,0);

$('body').bind('mousemove', function(e) {
	mouseMapper.update({x:e.pageX,y:e.pageY});	
});

