//global variables for game board, etc.

// size of the game board
var boardWidth = 1200;
var boardHeight = 2000;

// size of viewport
var viewportWidth = 1200;
var viewportHeight = 600;

// size of each square on the board
var boardPieceWidth = 100;
var boardPieceHeight = 100;

//offsets
var offsetX = 0;
var offsetY = -boardHeight + viewportHeight;


// width of the White House entrance
var goalWidth = 3 * boardPieceWidth;

// for adding new enemies at different frequencies
var count = 0;

// global variable containing all Enemies for each round
var allPieces = new Array;


// Placed in function so that each win rebuilds the bad guys
function createCharacters() {
    player = new MarcoRubio();

    var mitt = new MittGhost();
    var hillary = new Hillary();
    var skeletonBlack = new SkeletonClosetBlack();
    var koch = new Koch();

    var skeletonsRed = piecesArray(player.skeletons,SkeletonClosetRed);
    var gaffes = piecesArray(player.gaffes,Gaffe);
    var usccs = piecesArray(player.uschamber,Uscc);

    function piecesArray(pieceQty, constructorType){
        var pieces = [];
        for (var i = 0; i < pieceQty; i++) {
            var piece = new constructorType();
            pieces.push(piece);
          };
        return pieces;
    };

    allPieces = [mitt, hillary, skeletonBlack, skeletonsRed, koch, gaffes, usccs];

}


function addEnemies(dt) {
    count++;

    var rightwardness = player.x / boardPieceWidth + 1;

    var primaries = player.y >= 10 * boardPieceHeight ? true : false;
    var trumpTime = Math.floor(Math.random() * 1000 );

    var generalElection = player.y < 10 * boardPieceHeight ? true : false;
    var billTime = Math.floor(Math.random() * 200);

    if (primaries === true && count % trumpTime === 0 ) {
        trump = new Trump();
        trump.index = allPieces.push(trump);
    }
    if (count % (rightwardness + 20) == 0 ) {
        rightWingNut = new RightWingNut();
        rightWingNut.speed = 2000 / rightwardness;
        rightWingNut.index = allPieces.push(rightWingNut);
    }
    if (generalElection === true && count % billTime === 0) {
            bill = new Bill();
            bill.index = allPieces.push(bill);
    }

}

// generate a random position, based on boundary width, height and x and y offset
randomPosition = function(boundaryWidth, boundaryHeight, boundaryX, boundaryY) {
	var x = (Math.floor(Math.random() * boundaryWidth) + boundaryX) * boardPieceWidth;
	var y = (Math.floor(Math.random() * boundaryHeight) + boundaryY) * boardPieceHeight;
	return [x,y];
}

function youWin() {
    console.log('you win');
}
