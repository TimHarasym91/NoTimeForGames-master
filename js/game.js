document.onreadystatechange = function () {
    if (document.readyState == "complete") {
        var game = new PixelJS.Engine();
        game.init({
            container: 'game_container',
            width: 800,
            height: 600
        });

        //Add background grass tile
        var backgroundLayer = game.createLayer('background');
        var grass = backgroundLayer.createEntity();
        backgroundLayer.static = true;
        grass.pos = { x: 0, y: 0 };
        grass.asset = new PixelJS.Tile();
        grass.asset.prepare({
            name: 'grass.png',
            size: {
                width: 800,
                height: 600
            }
        });

        //Add player character
        var playerLayer = game.createLayer('players');
        var player = new PixelJS.Player();
        player.addToLayer(playerLayer);
        player.pos = { x: 200, y: 300 };
        player.size = { width: 32, height: 32 };
        player.velocity = { x: 100, y: 100 };
        player.allowDiagonalMovement = true;
        player.asset = new PixelJS.AnimatedSprite();
        player.asset.prepare({
            name: 'char.png',
            frames: 3,
            rows: 4,
            speed: 100,
            defaultFrame: 1
        });

        //Create item layer
        var itemLayer = game.createLayer('items');
        //Create coin item
        var coin = itemLayer.createEntity();
        coin.pos = {
            x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
            y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
        };
        coin.size = { width: 12, height: 16 };
        coin.asset = new PixelJS.AnimatedSprite();
        coin.asset.prepare({
            name: 'coin.png',
            frames: 8,
            rows: 1,
            speed: 80,
            defaultFrame: 0
        });

        //Add  BLOCK coin item
        var coinBlock = itemLayer.createEntity();
        coinBlock.pos = {
            x: 400,
            y: 500
        };
        coinBlock.size = { width: 12, height: 16 };
        coinBlock.asset = new PixelJS.AnimatedSprite();
        coinBlock.asset.prepare({
            name: 'coinBlock.png',
            frames: 8,
            rows: 1,
            speed: 1,
            defaultFrame: 0
        });

        //Add collect coin sound on collision and scoreboard
        var collectSound = game.createSound('collect');
        collectSound.prepare({ name: 'coin.mp3' });

        player.onCollide(function (entity) {
            if (entity === coin) {
                collectSound.play();
                coin.pos = {
                    x: Math.floor(Math.random() * (700 - 100 + 1) + 100),
                    y: Math.floor(Math.random() * (500 - 100 + 1) + 100)
                };

                score += 1;
                scoreLayer.redraw = true;
                scoreLayer.drawText(
                    'Coins: ' + score,
                    50,
                    50,
                    '14pt "Trebuchet MS", Helvetica, sans-serif',
                    '#FFFFFF',
                    'left'
                );
            }

        });

        playerLayer.registerCollidable(player);
        itemLayer.registerCollidable(coin);

        var score = 0;
        var scoreLayer = game.createLayer("score");
        scoreLayer.static = true;

        //Load and run game
        game.loadAndRun(function (elapsedTime, dt) {
        });
    }
}
