// setup screen where you choose your player

function setup() {

	// display set up / intro overlay on Resource load
	var setupPos = [0,0];
	ctx.drawImage(Resources.get('images/gameboard.jpg'), 0 ,0);
	ctx.drawImage(Resources.get('images/setup-screen.jpg'), setupPos[0], setupPos[1]);

	ctx.drawImage(Resources.get('images/ben-carson.png'), (setupPos[0] + 100), (setupPos[1] + 100));

	// choose player functionality, show/hide character description

	// "Go!" button hides setup screen, starts game with correct player
}