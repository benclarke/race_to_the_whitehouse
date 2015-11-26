// Interactions

function collision() {
	if (this.pieceType == 'moving') {
		if ((player.y == this.y) || (player.y == this.y - player.iconSize * boardPieceHeight)) {
			var give = player.iconSize == 1 ? 150 : 50;
			if ((player.x < this.x + give) && ( player.x > this.x - give ))
				{
					this.hit = true;
				}
		}
	}

	if (this.pieceType == 'randomMoving') {
		this.centerX = this.x - boardPieceWidth/2;
		this.centerY = this.y - boardPieceHeight/2;
		var playerCenterX = player.iconSize == 1 ? player.x - boardPieceWidth : player.x - boardPieceWidth/2;
		var playerCenterY = player.iconSize == 1 ? player.y - boardPieceHeight : player.y - boardPieceHeight/2;
		var give = player.iconSize == 1 ? 150 : 60;
		// if player position is witin an area radiating from this position
		if (((this.centerX >= playerCenterX - give) && (this.centerX <= playerCenterX + give)) && ((this.centerY >= playerCenterY - give) && (this.centerY <= playerCenterY + give))) {
			this.hit = true;
			console.log('hit Mitt');
		}
	}

	if (this.pieceType == 'stationary') {
		if ((player.y == this.y) || (player.y == this.y - player.iconSize * boardPieceHeight)) {
			if ((player.x == this.x) || (player.x == this.x - player.iconSize * boardPieceWidth)) {
				this.hit = true;
			}
		}
	}

  //if we have a collision, then...
  if (this.hit === true) {
		// if enemy is fatal, start over
		if (this.damageType == 'fatal') {
			player.startOver();
		}
		//if enemy takes $$, subtract from cash
		else if (this.damageType === 'cash') {
			player.cash = player.cash - 100 * this.damage + 100; // add $100 to compensate for move
		}
		// if goodie gives $$, add to cash
		else if (this.goodieType === 'cash') {
			player.cash = player.cash + 100 * this.goodie + 100; // add $100 to compensate for move
		}
		// move back player as many spaces as possible within damage, and not off bottom of board
		else if (this.damageType === 'position') {
			for (var i = this.damage; i > 0; i--) {
				if (player.y < player.playerStartY) {
					player.y = player.y + boardPieceHeight;
					player.setOffsetY('down');
				}
			};
		}
		else if (this.goodieType === 'position') {
			for (var i = this.goodie; i > 0; i--) {
				if (player.y > 300) {
					player.y = player.y - boardPieceHeight;
					player.setOffsetY('up');
				}
			};
		}
		this.update = function(){};
		this.hit = false;
		this.sprite = this.hitSprite;
		var piece = this;
		window.setTimeout(fadeOut, 2500);

		function fadeOut() {
			piece.sprite = 'images/blank-piece.png';
		}
  }
}