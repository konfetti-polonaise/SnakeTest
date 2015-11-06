
//snake
var snakeHead, snakeBody;
var direction, oldHeadX, oldHeadY;
//input
var cursors;

//interactive objects
var partyDude;

//hud TODO evtl auf eigene klasse auslagern
var score, scoreText;

var delay = 0;

var Game = {


    preload : function() {
        game.load.image('bodyPart', 'assets/images/bodyPart.png');
        game.load.image('partyDude', 'assets/images/bodyPart.png');                 //TODO asset für einsammelbare personen hinzufügen
        game.load.spritesheet('snakeHead', 'assets/images/snakeHead.png', 32, 32);

    },

    create : function() {
        //initialisierung der schlange
        snakeHead = game.add.sprite(150,150, 'snakeHead');
        snakeHead.animations.add('walk', [0, 1], 10, true);
        snakeHead.animations.play('walk');
        snakeHead.anchor.setTo(0.5, 0.5);                       //pivotpoint in der mitte
        snakeBody = [];
        direction = 'right';

        for (var i = 0; i < 1; i++) {
            snakeBody[i] = game.add.sprite(150 - i * 16, 150, 'bodyPart');
            snakeBody[i].anchor.setTo(0.5, 0.5);
        }

        //interaktive Objecte
        partyDude = {};
        this.spawnPartyDude(); //erzeugt den ersten einsammelbaren partygastd

        //hud
        score = 0;
        scoreText = game.add.text(20, 20, "SCORE: " + score, {fontSize: '32px', fill: '#FF0000'})


        cursors = game.input.keyboard.createCursorKeys();
    },

    spawnPartyDude : function() {

        var x = Math.floor(Math.random() * game.world.width),
            y = Math.floor(Math.random() * game.world.height);
        partyDude = game.add.sprite(x, y, 'partyDude');
    },

    update : function () {
        if (delay > 12) {
            //Steuerung der Schlange
            if (cursors.right.isDown && direction != 'left') {
                direction = 'right';
            } else if (cursors.left.isDown && direction != 'right') {
                direction = 'left';
            } else if (cursors.up.isDown && direction != 'down') {
                direction = 'up';
            } else if (cursors.down.isDown && direction != 'up') {
                direction = 'down';
            }

            var speed = 16; //TODO entfernen, nur für test hier

            oldHeadX = snakeHead.x;
            oldHeadY = snakeHead.y;

            if (direction == 'left') {
                snakeHead.x -= speed;
                snakeHead.angle = 180;
            } else if (direction == 'right') {
                snakeHead.x += speed;
                snakeHead.angle = 0;
            } else if (direction == 'up') {
                snakeHead.y -= speed;
                snakeHead.angle = 270;
            } else if (direction == 'down') {
                snakeHead.y += speed;
                snakeHead.angle = 90;
            }

            //letztes element der schlange an die erste stelle setzten
            var lastPart = snakeBody.pop();
            lastPart.x = oldHeadX;
            lastPart.y = oldHeadY;
            lastPart.angle = snakeHead.angle;
            snakeBody.unshift(lastPart);

            this.catchPartyDude();
            delay = 0;
        } else {
            delay++;
        }

    },

    catchPartyDude : function() {
        var dx = snakeHead.x - partyDude.x;
        var dy = snakeHead.y - partyDude.y;
        var dist = Math.sqrt((dx * dx) + (dy * dy));

        if (dist < 32) {
            partyDude.destroy();
            this.spawnPartyDude();

            //neues element vorne in der schlange einfügen
            var newPart = game.add.sprite(oldHeadX, oldHeadY, 'bodyPart');
            newPart.anchor.setTo(0.5, 0.5);
            snakeBody.unshift(newPart);

            score++;
            scoreText.text = 'SCORE: ' + score.toString();
        }
    }
};