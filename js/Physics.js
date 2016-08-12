/*
Physics.js
Written by Joey Lemberg for Swing Ninja
joeylemberg@gmail.com
yangcanvas.com
copyright Yang Canvas LLC, all rights reserved
May 7, 2014
*/


var gravity;

function pSum(p1, p2) {
	return [p1[0] + p2[0], p1[1], p2[1]];
}

function distSquared(p1, p2) {
	var d1 = p1[0] - p2[0];
	var d2 = p1[1] - p2[1];
	return (d1 * d1 + d2 * d2);
}

function intersection(line1, line2) {
	var intersection = [0, 0];
	var m = (line1[3] - line1[1]) / (line1[2] - line1[0]);
	var n = (line2[3] - line2[1]) / (line2[2] - line2[0]);

	if (line1[0] == line1[2]) {
		if (line2[0] == line2[2]) {
			return "parallel";
		} else {
			intersection[0] = line1[0];
			intersection[1] = n * (line1[0] - line2[0]) + line2[1];
			return intersection;
		}
	}

	if (line2[0] == line2[2]) {
		if (line1[0] == 1[2]) {
			return "parallel";
		} else {
			intersection[0] = line2[0];
			intersection[1] = m * (line2[0] - line1[0]) + line1[1];
			return intersection;
		}
	}

	if (m == n) {
		return "parallel";
	} else {
		intersection[0] = (m * line1[0] - line1[1] - n * line2[0] + line2[1]) / (m - n);
		intersection[1] = m * (intersection[0] - line1[0]) + line1[1];
		return intersection;
	}
}

function collisionCheck(vector, line) {
	var x = vector[0];
	var y = vector[1];
	var dx = vector[2];
	var dy = vector[3];
	var y0;
	var y1;

	if (line[1] < line[3]) {
		y0 = line[1];
		y1 = line[3];
	} else {
		y0 = line[3];
		y1 = line[1];
	}


	if (x + dx / 2 >= line[0] - Math.abs(dx) / 2 && x + dx / 2 <= line[2] + Math.abs(dx) / 2 && y + dy / 2 >= y0 - Math.abs(dy) / 2 && y + dy / 2 <= y1 + Math.abs(dy) / 2) {
		var xX = intersection([x, y, x + dx, y + dy], line);
		if (xX == "parallel") {
			return 0;
		} else {
			var dist = distSquared([x, y], xX);
			if (dist < dx * dx + dy * dy) {
				if ((xX[0] >= line[0] && xX[0] <= line[2] || xX[1] >= y1 && xX[1] <= y0) && (dx * (xX[0]-x) >= 0 && dy * (xX[1]-y) >= 0))
					return [line, xX, dist];
				else return 0;
			} else {
				return 0;
			}
		}
	} else {
		return 0;
	}
}

function wallBetween(p1, p2, lines) {

	var vector = [p1[0], p1[1], (p2[0] - p1[0]), (p2[1] - p1[1])];

	var crashSpot = null;

	for (var i = 0; i < lines.length; i++) {
		if (crashSpot = collisionCheck(vector, lines[i])) {
			return crashSpot;
		}
		}

		return crashSpot;
	}

	function actionLineCollisions(vector, lines) {

		var nearestCollision = null;

		for (var i = 0; i < lines.length; i++) {
			line = lines[i];
			var thisCollision = collisionCheck(vector, line);
			if (thisCollision && (!nearestCollision || thisCollision[2] < nearestCollision[2])) nearestCollision = thisCollision;

		}

		return nearestCollision
	}

	function collisionDetection(vector, lines, excludedLine, needToKnowSide) {

		var nearestCollision = null;

		for (var i = 0; i < lines.length; i++) {
			line = lines[i];
			var thisCollision = collisionCheck(vector, line);
			if (thisCollision && (!nearestCollision || thisCollision[2] < nearestCollision[2])) nearestCollision = thisCollision;

		}

		if (!nearestCollision) return null;
		else {
			var orthogonalThetas = [(nearestCollision[0][5] + 5 * Math.PI / 2) % (2 * Math.PI), (nearestCollision[0][5] + 3 * Math.PI / 2) % (2 * Math.PI)];
			var vectorTheta = Math.atan2(vector[3], vector[2]) + Math.PI;
			nearestCollision.push(vectorTheta);
			return nearestCollision;
		}
	}

	function firstCollision(points, dx, dy, lines, excludedLines) {

		var nearestCollision = null;

		for (var j = 0; j < points.length; j++)
		for (var i = 0; i < lines.length; i++) {
			line = lines[i];
			var thisCollision = collisionCheck([points[j][0], points[j][1], dx, dy], line);
			if (thisCollision && (!nearestCollision || thisCollision[2] < nearestCollision[2])) nearestCollision = jQuery.extend(true, [], thisCollision);
		}

		if (!nearestCollision) return null;
		else {
			var orthogonalThetas = [(nearestCollision[0][5] + 5 * Math.PI / 2) % (2 * Math.PI), (nearestCollision[0][5] + 3 * Math.PI / 2) % (2 * Math.PI)];
			var vectorTheta = Math.atan2(dy, dx) + Math.PI;
			if (Math.abs(orthogonalThetas[0] - vectorTheta) < Math.PI / 2 || Math.abs(orthogonalThetas[0] - vectorTheta) > 3 * Math.PI / 2) {
				nearestCollision.push(orthogonalThetas[0]);
			} else {
				nearestCollision.push(orthogonalThetas[1]);
			}
			return nearestCollision;
		}
	}
