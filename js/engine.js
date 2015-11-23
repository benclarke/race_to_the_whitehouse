// game engine

var Engine = (function(global) {

    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime

    canvas.width = 1200;
    canvas.height = 2075;
    canvas.tabIndex = 1;

    var wrapper = document.createElement('div')
    wrapper.className = 'wrapper';
    wrapper.setAttribute('id', 'wrapper')
    doc.body.appendChild(wrapper);
    var whiteHouse = document.createElement('div');
    whiteHouse.className = 'whitehouse';
    whiteHouse.setAttribute('id', 'whitehouse');
    wrapper.appendChild(whiteHouse);
    wrapper.appendChild(canvas);

    function main() {

        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;


        update(dt);
        render();

        lastTime = now;


        win.requestAnimationFrame(main);
    }

    function init() {
        reset();
        lastTime = Date.now();
        createCharacters();
        main();
    }

    function update(dt) {
        updateEntities(dt);
        document.getElementById('wrapper').scrollTop = player.y - 200;
    }

    function updateEntities(dt) {

        addEnemies(dt);

        allPieces.forEach(function(piece) {
            if (piece instanceof Array) {
                for (var i = 0; i < piece.length; i++) {
                    piece[i].update(dt);
                };
            } else {
            piece.update(dt);
            }
        });

        player.update(dt);
    }

    function render(dt) {

        //draw the gameboard
        ctx.drawImage(Resources.get('images/gameboard.jpg'), 0, 0 ) ;

        renderEntities();


    }

    /* This function is called by the render function and is called on each game
     * tick. It's purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allPieces.forEach(function(piece) {
            if (piece instanceof Array) {
                for (var i = 0; i < piece.length; i++) {
                    piece[i].render();
                };
            } else {
            piece.render();
            }
        });

        player.render();
    }

    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // choosePlayer();
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/ben-carson.png',
        'images/jeb-bush.png',
        'images/marco-rubio.png',
        'images/carly-fiorina.png',
        'images/ted-cruz.png',
        'images/enemy-trump.png',
        'images/enemy-nut.png',
        'images/enemy-hillary-right.png',
        'images/enemy-hillary-left.png',
        'images/enemy-romney.png',
        'images/enemy-skeleton-red.png',
        'images/enemy-skeleton-red-hit.png',
        'images/enemy-skeleton-black.png',
        'images/enemy-skeleton-black-hit.png',
        'images/enemy-gaffe.png',
        'images/setup-screen.jpg',
        'images/gameboard.jpg',
        'images/goodie-koch.png',
        'images/goodie-uscc.png',
        'images/goodie-disaster.png',
        'images/goodie-cash-hit.png',
        'images/enemy-bill.png'
    ]);

    Resources.onReady(setup);


    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developer's can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);
