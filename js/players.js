//Player

var Player = function() {

    // initial player status
    this.win = false;

    // default position
    this.playerStartX = boardWidth - 1 * boardPieceWidth;
    this.playerStartY = (boardHeight / boardPieceHeight - 2) * boardPieceHeight;

    this.x = this.playerStartX;
    this.y = this.playerStartY;

		//player size -- everyone is 0 except bush
		this.iconSize = 0;

		//player speed
		this.speed = 1;

		//enemy speed for player
		this.enemySpeed = 1;

		//cash on hand
		var initialCash = 2000;
		this.cash = initialCash;

		// what happens with each frame
    this.update = function(dt) {

    	if (player.x <= goalWidth && player.y < 0) {
    		youWin();
	    	createCharacters();
    	}
    };

		this.cashDisplay = function() {
			// track player cash onscreen
			cashX = this.x + boardPieceWidth/2;
			cashY = this.y + 1.5 * boardPieceHeight;
			ctx.fillStyle = this.cash > 500 ? 'white' : 'red';
			ctx.font = '20px Arial';
			ctx.textAlign = 'center';
			ctx.fillText('Cash: $' + player.cash, cashX, cashY);
		}

    this.render = function() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        this.cashDisplay();

    };

    this.handleInput = function(key) {
    	// first, each move costs $$
    	this.cash = this.cash - 100;
    	if ( this.cash <= 0 ) {
    		createCharacters();
    	}

      // handling keyboard input
      switch(key) {
          case 'left':
              this.x = this.x === 0 ? this.x : this.x - boardPieceWidth;
              break;
          case 'right':
              this.x = this.x === boardWidth - boardPieceWidth ? this.x : this.x + boardPieceWidth;
              break;
          case 'up':
              this.y = this.y < 0 ? this.y : this.y - boardPieceHeight;
              break;
          case 'down':
              this.y = this.y === this.playerStartY ? this.y : this.y + boardPieceHeight;
              break;
      }
    }
    this.startOver = function() {
    	this.x = this.rightness * boardPieceWidth;
    	this.y = this.playerStartY;
    	this.cash = initialCash;
    }
}

document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


// Ben Carson
var BenCarson = function() {
	Player.call(this);

	this.sprite = 'images/ben-carson.png';

	this.enemySpeed = 0.75;

	this.rightness = 10;

	// inital rightward position
	this.x = this.rightness * boardPieceWidth;

	var initialCash = 2000;

	this.cash = initialCash;

	this.uschamber = 0;

	this.koch = false;

	this.gaffes = 5;
	this.skeletons = 5;
}

// Carly Fiorina
var CarlyFiorina = function() {
	Player.call(this);

	this.sprite = 'images/carly-fiorina.png';

	this.speed = 1;
	this.enemySpeed = 0.90;

	this.rightness = 6;

	// inital rightward position
	this.x = this.rightness * boardPieceWidth;

	var initialCash = 2000;

	this.cash = initialCash;

	this.uschamber = 8;

	this.koch = false;

	this.skeletons = 3;

	this.gaffes = 2;
}


// Jeb Bush
var JebBush = function() {
	Player.call(this);

	this.sprite = 'images/jeb-bush.png';

	this.speed = 1;
	this.enemySpeed = 1;

	this.rightness = 2;

	this.x = this.rightness * boardPieceWidth;

	// icon is bigger, so start higher up by one piece
	this.playerStartY = boardHeight - 4 * boardPieceHeight;
	this.y = this.playerStartY;
	this.iconSize = 1;

	var initialCash = 4000;

	this.cash = initialCash;

	this.uschamber = 8;

	this.koch = false;

	this.skeletons = 2;

	this.gaffes = 3;

	// adjust cash display down for big Jeb
	this.cashDisplay = function() {
		// track player cash onscreen
		cashX = this.x + boardPieceWidth;
		cashY = this.y + 3 * boardPieceHeight;
		ctx.fillStyle = this.cash > 500 ? 'white' : 'red';
		ctx.font = '20px Arial';
		ctx.textAlign = 'center';
		ctx.fillText('Cash: $' + player.cash, cashX, cashY);
	}

}

// Marco Rubio
var MarcoRubio = function() {
	Player.call(this);

	this.sprite = 'images/marco-rubio.png';

	this.rightness = 7;

	this.x = this.rightness * boardPieceWidth;

	this.uschamber = 10;

	this.koch = true;

	this.skeletons = 5;
	this.gaffes = 5;

}
// Ted Cruz
// Lots of money, but multiple Hillarys or addition of DNC or something
var TedCruz = function() {
	Player.call(this);

	this.sprite = 'images/ted-cruz.png';

	this.rightness = 11;

	this.x = this.rightness * boardPieceWidth;

	this.uschamber = 8;

	this.koch = true;

	this.skeletons = 4;
	this.gaffes = 2;

}

