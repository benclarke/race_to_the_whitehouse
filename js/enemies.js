// Enemies our player must avoid
var MovingEnemy = function() {

		this.pieceType = 'moving';

    // this enemy's speed
    this.speed = 250 / player.enemySpeed;

    // comes at the player somewhere in front of them 1 - 3 squares
    this.y = player.y - Math.floor(Math.random() * 10) * boardPieceHeight;

	  // Draw the enemy on the screen, required method for game
		this.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		};

		this.hitSprite = 'images/enemy-gaffe.png';

		this.hit = false;


};

// Trump
var Trump = function() {
	MovingEnemy.call(this);

	this.sprite = 'images/enemy-trump.png';

	this.damage = 5;

	this.damageType = 'cash';

	this.x = -boardPieceWidth;

	this.update = function(dt) {
		if (this.x < boardWidth) {
			this.x = this.x + dt * this.speed;
		}

		collision.call(this);

	}

} // end Trump

// Right Wing Nut

var RightWingNut = function() {
	MovingEnemy.call(this);

	this.sprite = 'images/enemy-nut.png';

	this.damage = 2;

	this.damageType = 'position';

	this.x = boardWidth;


	this.update = function(dt) {
		if (this.x > -boardPieceWidth) {
			this.x = this.x - dt * this.speed;
		}

		collision.call(this);

	}

}

var Bill = function() {
	MovingEnemy.call(this);
	this.sprite = 'images/enemy-bill.png';
	this.damage = 2;
	this.damageType = 'position';
	this.x = 0;

	this.update = function(dt) {
		if (this.x < boardWidth) {
			this.x = this.x + dt * this.speed;
		}

		collision.call(this);

	}

}

var Hillary = function() {
	MovingEnemy.call(this);

	this.sprite = 'images/enemy-hillary-right.png';

	this.x = 0;
	this.y = 0;

	this.speed = 400;

	this.damageType = 'fatal';

	var turn = false;

	this.update = function(dt) {
		if ((turn == false) &&  (this.x < goalWidth)) {
			this.x = this.x + dt * this.speed;
		} else if ( this.x > 0 ) {
			this.x = this.x - dt * this.speed;
			this.sprite = 'images/enemy-hillary-left.png';
			turn = true;
		} else {
			turn = false;
			this.x = this.x + dt * this.speed;
			this.sprite = 'images/enemy-hillary-right.png';
		}

		collision.call(this);
	}

} // end Hillary

var MittGhost = function() {
	MovingEnemy.call(this);

	this.pieceType = 'randomMoving';

	this.sprite = 'images/enemy-romney.png';

	this.x = 0;
	this.y = 0;

	var boundaryX = 0;
	var boundaryY = 2;
	var boundaryWidth = 10;
	var boundaryHeight = 15;

	this.damageType = 'fatal';

	var position = [];
	position[0] = this.x;
	position[1] = this.y;

	var speed = { 'x': 1 , 'y': 1};

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

	} // end update function for Mitt
} // end Mitt

var StationaryEnemy = function() {

	this.pieceType = 'stationary';

	this.hit = false;

	// default boundaries for stationary enemies
	this.boundaryX = 0;
	this.boundaryY = 2;
	this.boundaryWidth = 12;
	this.boundaryHeight = 14;


	//a random position on the board
	var position = randomPosition(this.boundaryWidth, this.boundaryHeight, this.boundaryX, this.boundaryY);
	this.x = position[0];
	this.y = position[1];

	this.damageType = 'cash';

	// have we hit it yet?
	this.hit = false;

	this.update = function(dt) {
		collision.call(this);
	}

	this.sprite = 'images/enemy-hillary-right.png';
	this.hitSprite = 'images/enemy-gaffe.png';

	this.render = function() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

}

var Gaffe = function() {
	StationaryEnemy.call(this);

	this.damage = 3;

	this.damageType = 'position';

	this.sprite = 'images/ben-carson.png';

}

var SkeletonClosetBlack = function() {
	StationaryEnemy.call(this);

	this.damageType = 'fatal';

	this.sprite = 'images/enemy-skeleton-black.png';

}

var SkeletonClosetRed = function() {
	StationaryEnemy.call(this);

	this.damage = 3;

	this.damageType = 'cash';

	this.sprite = 'images/enemy-skeleton-red.png';

}
