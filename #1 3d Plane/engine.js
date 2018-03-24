var Vertex = function(x, y, z) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
	this.z = parseFloat(z);
};

var Vertex2D = function(x, y) {
	this.x = parseFloat(x);
	this.y = parseFloat(y);
};

var Plane = function(center, side) {
	// Generate the vertices
	var d = side / 2;

	this.vertices = [
        new Vertex(center.x , center.y , center.z ),
        new Vertex(center.x , center.y , center.z - d),
        new Vertex(center.x + d, center.y , center.z - d),
        new Vertex(center.x + d, center.y , center.z ),

        new Vertex(center.x - d, center.y , center.z ),
        new Vertex(center.x - d, center.y , center.z - d),
        new Vertex(center.x , center.y , center.z - d),
        new Vertex(center.x , center.y , center.z ),

        new Vertex(center.x , center.y , center.z +d),
        new Vertex(center.x , center.y , center.z ),
        new Vertex(center.x + d, center.y , center.z ),
        new Vertex(center.x + d, center.y , center.z +d),

        new Vertex(center.x - d, center.y , center.z +d),
        new Vertex(center.x - d, center.y , center.z ),
        new Vertex(center.x , center.y , center.z ),
        new Vertex(center.x , center.y , center.z +d)


  	];

	// Generate the faces
	this.faces = [
		[this.vertices[0], this.vertices[1], this.vertices[2], this.vertices[3]],
    [this.vertices[4], this.vertices[5], this.vertices[6], this.vertices[0]],
    [this.vertices[8], this.vertices[9], this.vertices[10], this.vertices[11]],
    [this.vertices[12], this.vertices[13], this.vertices[14], this.vertices[15]]
	];
};

function project(M) {
	return new Vertex2D(M.x, M.z);
}

function render(objects, ctx, dx, dy) {
	// Clear the previous frame
	ctx.clearRect(0, 0, 2*dx, 2*dy);

	// For each object
	for (var i = 0, n_obj = objects.length; i < n_obj; ++i) {
		// For each face
		for (var j = 0, n_faces = objects[i].faces.length; j < n_faces; ++j) {
			// Current face
			var face = objects[i].faces[j];

			// Draw the first vertex
			var P = project(face[0]);
			ctx.beginPath();
			ctx.moveTo(P.x + dx, -P.y + dy);
      ctx.save();
      if(j==0){
          ctx.fillStyle = "black";
          ctx.fillText("C(0,0)",P.x + dx, -P.y + dy);
      }
      if(j==1){
          ctx.fillStyle = "red";
          ctx.fillText("X",P.x + dx, -P.y + dy);
      }
      if(j==2){
          ctx.fillStyle = "green";
          ctx.fillText("Y",P.x + dx, -P.y + dy);
      }
      ctx.restore();


			// Draw the other vertices
			for (var k = 1, n_vertices = face.length; k < n_vertices; ++k) {
				P = project(face[k]);
				ctx.lineTo(P.x + dx, -P.y + dy);
			}

			// Close the path and draw the face
			ctx.closePath();
			ctx.stroke();
			ctx.fill();
		}
	}
}

(function() {
	// Fix the canvas width and height
	var canvas = document.getElementById('cnv');
	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	var dx = canvas.width / 2;
	var dy = canvas.height / 2;

	// Objects style
	var ctx = canvas.getContext('2d');
	ctx.strokeStyle = 'rgba(0, 0, 0, 1)';
	ctx.fillStyle = 'rgba(50, 100, 125, 0.2)';

	// Create the plane
	var plane_center = new Vertex(0,dy,0);
	var plane = new Plane(plane_center, dy);
	var objects = [plane];

	// First render
	render(objects, ctx, dx, dy);


	// Rotate a vertice
	function rotate(M, center, theta, phi) {
        // Rotation matrix coefficients
    	var ct = Math.cos(theta);
    	var st = Math.sin(theta);
    	var cp = Math.cos(phi);
    	var sp = Math.sin(phi);

		// Rotation
		var x = M.x - center.x;
		var y = M.y - center.y;
		var z = M.z - center.z;

		M.x = ct * x - st * cp * y + st * sp * z + center.x;
		M.y = st * x + ct * cp * y - ct * sp * z + center.y;
		M.z = sp * y + cp * z + center.z;
	}

	// Initialize the movement


	function autorotate() {
    var lengthP = plane.vertices.length
		for (var i = 0; i < lengthP; ++i)
			rotate(plane.vertices[i], plane_center, -Math.PI/220, Math.PI / 350);

		render(objects, ctx, dx, dy);

		autorotate_timeout = setTimeout(autorotate, 20);
	}
	autorotate_timeout = setTimeout(autorotate, 1000);
})();
