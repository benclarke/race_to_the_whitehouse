// goodies

var StationaryGoodie = function() {

	this.pieceType = 'stationary';

	this.render = function() {
	    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	};

	this.update = function(dt) {
		collision.call(this);
	}
	this.hitSprite = 'images/enemy-gaffe.png';
}

var Koch = function() {
	StationaryGoodie.call(this);

	this.sprite = 'images/goodie-koch.png';

	this.goodie = 9;

	this.goodieType = 'cash';

	this.boundaryX = 8;
	this.boundaryY = 4;
	this.boundaryWidth = 4;
	this.boundaryHeight = 10;

	var position = randomPosition(this.boundaryWidth, this.boundaryHeight, this.boundaryX, this.boundaryY);
	this.x = position[0];
	this.y = position[1];


}

// chamber of commerce money
var Uscc = function() {
	StationaryGoodie.call(this);

	this.sprite = 'images/goodie-uscc.png';

	this.goodie = 4;

	this.goodieType = 'cash';

	this.boundaryX = 0;
	this.boundaryY = 0;
	this.boundaryWidth = 9;
	this.boundaryHeight = 15;

	var position = randomPosition(this.boundaryWidth, this.boundaryHeight, this.boundaryX, this.boundaryY);
	this.x = position[0];
	this.y = position[1];


}

var Reagan = function() {
	MovingEnemy.call(this);

	this.goodieType = 'enemySpeed';

	this.sprite = 'images/goodie-reagan.png';

	var boundaryX = 0;
	var boundaryY = 0;
	var boundaryWidth = 10;
	var boundaryHeight = 15;

	this.update = function(dt) {
		collision.call(this);

		var oldPosition = [this.x, this.y];

		// get random new point
		function getNewPosition() {

			position = randomPosition(boundaryWidth, boundaryHeight, boundaryY, boundaryY);

			calcSpeed()

			function calcSpeed() {
			    var x = Math.abs(oldPosition[0] - position[0]);
			    var y = Math.abs(oldPosition[1] - position[1]);
			    var speedVariable = Math.floor(Math.random() * 100);

			    speed.x = x / speedVariable;
			    speed.y = y / speedVariable;

			}
		}

		// need to find a match within 1 px, since final position may not === what is calculated with speed variable
		if ((Math.abs(position[0] - this.x) < 1) && (Math.abs(position[1] - this.y) < 1)) {
			getNewPosition();
		}

		if (position[0] > this.x) {
			this.x += speed.x;

		} else if (position[0] < this.x) {
			this.x -= speed.x;
		}

		if (position[1] > this.y) {
			this.y += speed.y;

		} else if (position[1] < this.y) {
			this.y -= speed.y;
		}

	} // end update function for Reagan
}