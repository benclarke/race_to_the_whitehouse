//global variables for game board, etc.

// size of the game board
var boardWidth = 1300;
var boardHeight = 2300;

// size of viewport
var viewportWidth = 1300;
var viewportHeight = 600;

// size of each square on the board
var boardPieceWidth = 100;
var boardPieceHeight = 100;

//offsets
var initialOffsetY = -boardHeight + viewportHeight;
var offsetY = initialOffsetY;

// width of the White House entrance
var goalWidth = 3 * boardPieceWidth;

// for adding new enemies at different frequencies
var count = 0;

// all enemies and goodies that are added once at the beginning of game play
var allPieces = new Array;

// all enemies generated after start of game play
var addedEnemies = new Array;

// for sound effects
var audio;


// Placed in function so that each win rebuilds the bad guys
function createCharacters() {
    var mitt = new MittGhost();

    var hillary = new Hillary();

    var skeletonBlack = new SkeletonClosetBlack();

    var koch = new Koch();

    var skeletonsRed = piecesArray(player.skeletons,SkeletonClosetRed);

    var gaffes = piecesArray(player.gaffes,Gaffe);

    var inflame = piecesArray(player.inflame,Inflame);

    var usccs = piecesArray(player.uschamber,Uscc);

    allPieces = [mitt, hillary, skeletonBlack, koch, skeletonsRed, gaffes, inflame, usccs];

}

function piecesArray(pieceQty, constructorType){
    var pieces = [];
    for (var i = 0; i < pieceQty; i++) {
        var piece = new constructorType();
        piece.index = pieces.push(piece);
      };
    return pieces;
};

function addEnemies(dt) {
    count++;

    var rightwardness = player.x / boardPieceWidth + 1;

    var primaries = player.y >= 10 * boardPieceHeight ? true : false;
    var trumpTime = Math.floor(Math.random() * 500  + 1);

    var generalElection = player.y < 9 * boardPieceHeight ? true : false;
    var billTime = Math.floor(Math.random() * 200 + 1);

    var trump, rightWingNut, bill;

    if (primaries === true && count % trumpTime === 0 ) {
        trump = new Trump();
        addedEnemies.push(trump);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }
    if (count % (rightwardness * 10) == 0 ) {
        rightWingNut = new RightWingNut();
        rightWingNut.speed = 2000 / rightwardness;
        addedEnemies.push(rightWingNut);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }
    if (generalElection === true && count % billTime === 0) {
        bill = new Bill();
        addedEnemies.push(bill);
        if (addedEnemies.length > 30) {addedEnemies.shift();}
    }

}

// generate a random position, based on boundary width, height and x and y offset
randomPosition = function(boundaryWidth, boundaryHeight, boundaryX, boundaryY) {
	var x = (Math.floor(Math.random() * boundaryWidth) + boundaryX) * boardPieceWidth;
	var y = (Math.floor(Math.random() * boundaryHeight) + boundaryY) * boardPieceHeight;
	return [x,y];
}


