var Menu = {

    preload : function () {
        game.load.image('logo', 'assets/images/logo.png');
    },

    create : function () {
        this.add.button(0, 0, 'logo', this.startGame, this);
    },

    startGame: function () {
        this.state.start('Game');
    }

};