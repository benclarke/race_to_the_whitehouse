//Player

var Player = function() {

    // initial player status
    this.win = false;
    this.lives = 1;

    // default position
    this.playerStartY = boardHeight - 2 * boardPieceHeight;

    this.y = this.playerStartY;

    // this.vy = this.y + offsetY;

		//player size -- everyone is 0 except bush
		this.iconSize = 0;

		//player speed
		this.speed = 1;

		//enemy speed for player
		this.enemySpeed = 1;

		// default amount of each goodie/enemy stationary piece
		this.inflame = 2;
		this.uschamber = 5;

		this.skeletons = 4;
		this.gaffes = 4;
		this.koch = true;

		//cash on hand
		this.initialCash = 20000;
		this.cash = this.initialCash;

		// what happens with each frame
    this.update = function(dt) {
    	if ( this.cash <= 0 ) {
    		this.startOver();
    	}
    };

		this.cashDisplay = function() {
			// track player cash onscreen
			cashX = this.x + this.iconSize * boardPieceWidth/2 + boardPieceWidth/2;
			cashY = this.vy + this.iconSize * 1.25 * boardPieceHeight + 1.5 * boardPieceHeight;
			ctx.fillStyle = this.cash > 500 ? 'black' : 'red';
			ctx.font = '20px Arial';
			ctx.textAlign = 'center';
			ctx.fillText('Cash: $' + player.cash, cashX, cashY);
		}

    this.render = function() {
    		this.vy = this.y + offsetY ;
        ctx.drawImage(Resources.get(this.sprite), this.x, this.vy);
        this.cashDisplay();

    };

    this.setOffsetY = function(direction) {
    	if ( this.y > boardHeight - 4 * boardPieceHeight) {
    		offsetY = initialOffsetY;
    	}
    	else if (this.y < viewportHeight - 2 * boardPieceHeight) {
    		offsetY = 0;
    	}
			else if (direction === 'up') {
				offsetY = offsetY + boardPieceHeight;
    	}
    	else if (direction === 'down') {
    		offsetY = offsetY - boardPieceHeight;
    	}

    }
    this.handleInput = function(key) {

    	// first, each move costs $$
    	this.cash = this.cash - 100;

      // handling keyboard input
      switch(key) {
          case 'left':
              this.x = this.x === 0 ? this.x : this.x - boardPieceWidth;
              break;
          case 'right':
              this.x = this.x === boardWidth - boardPieceWidth ? this.x : this.x + boardPieceWidth;
              break;
          case 'up':
	          	if (this.y === 300 && this.x <= 3 * boardPieceWidth){
	          		this.win = true;
	          		this.startOver();
	          	}
	          	if (this.y === 300) {
	          		this.y = this.y
	          	}	else {
	          		this.y = this.y - boardPieceHeight;
	          		this.setOffsetY('up');
	          	}
	              break;
          case 'down':
	            if (this.y === this.playerStartY) {
	            	this.y = this.y;
	            	offsetY = initialOffsetY;
	            } else {
	            	this.y = this.y + boardPieceHeight;
	            	this.setOffsetY('down');
            }
	            break;
      }


    }

    this.startOver = function() {
    	this.lives--;

  		createCharacters();
  		offsetY = initialOffsetY;
  		player.x = player.rightness * boardPieceWidth;
  		player.y = this.playerStartY;
  		player.cash = player.initialCash;

  		if (this.win == true) {
    		this.render = function() {
    			this.vy = this.playerStartY + offsetY - 4 * boardPieceHeight + player.iconSize * boardPieceHeight;
			    ctx.drawImage(Resources.get('images/youWin.png'), 0, this.vy);
			    ctx.drawImage(Resources.get('images/playAgain.png'), 550, this.vy + 470);
			    document.getElementById('wrapper').addEventListener('click', playAgain);
			  }
			  this.handleInput = function() {};
  		}
  		else if (this.lives <= 0) {
    		this.render = function() {
    			this.vy = this.playerStartY + offsetY - 5 * boardPieceHeight + player.iconSize * boardPieceHeight;
			    ctx.drawImage(Resources.get('images/gameover.png'), 0, this.vy);
			    ctx.drawImage(Resources.get('images/playAgain.png'), 550, this.vy + 470);
			    document.getElementById('wrapper').addEventListener('click', playAgain);
    		}
    		this.handleInput = function() {};
  		}

  		function playAgain() {
  			if (event.clientX > 550 && event.clientX < 750) {
  				if (event.clientY > 470 && event.clientY < 570) {
  					location.reload();
  				}
  			}
  		}

    }

} //end generic Player object

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

	this.rightness = 10;

  this.x = this.rightness * boardPieceWidth;

}

// Carly Fiorina
var CarlyFiorina = function() {
	Player.call(this);

	this.sprite = 'images/carly-fiorina.png';

	this.rightness = 6;

  this.x = this.rightness * boardPieceWidth;

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
	this.playerStartY = boardHeight - 3 * boardPieceHeight;
	this.y = this.playerStartY;
	this.iconSize = 1;

	this.initialCash = 5000;

	this.cash = this.initialCash;

}

// Marco Rubio
var MarcoRubio = function() {
	Player.call(this);

	this.sprite = 'images/marco-rubio.png';

	this.rightness = 7;

	this.x = this.rightness * boardPieceWidth;

	this.initialCash = 3000;
	this.cash = this.initialCash;

}
// Ted Cruz
// Lots of money, but multiple Hillarys or addition of DNC or something
var TedCruz = function() {
	Player.call(this);

	this.sprite = 'images/ted-cruz.png';

	this.rightness = 11;

	this.x = this.rightness * boardPieceWidth;

	this.initialCash = 3000;
	this.cash = this.initialCash;

}

