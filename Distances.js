var Distances = (function() {
	function Distances() {}
	Distances.prototype.reorder = function(x, y, json) {
		this.x = x;
		this.y = y;
		this.dots = JSON.parse(json);
		this.generate();
		return this.dots.sort(this.sort);
	}
	Distances.prototype.generate = function() {
		for (var i = 0; i < this.dots.length; i++) {
			this.dots[i].value = this.distance([this.x, this.y], this.dots[i].value.split(","));
		}	
	}
	Distances.prototype.distance = function (d1, d2) {//calculates the distance between points d1 = [x1, y1] and  d2 = [x2, y2], rounded to 2 digits after the dot
		return Math.round(Math.sqrt(Math.pow(d1[0]-d2[0], 2) + Math.pow(d1[1]-d2[1], 2))*100)/100
	}
	Distances.prototype.sort = function(a, b) {
		return a.value - b.value;
	}
	return Distances;
})();
