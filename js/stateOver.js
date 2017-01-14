var StateOver={    
    
   preload:function()
    {
        game.load.spritesheet('button', 'assets/button.png', 215, 53, 8); 
        
        game.load.image("title", "assets/title.png");
        game.load.image("game", "assets/extra/gameover.png");

    },
    
    create:function()
    {   

        

        this.title = game.add.tileSprite(0, game.height-640,game.width, 640, 'title');
        this.title.autoScroll(-100,0);
        this.btnPlayAgain=game.add.button(110,400,'button',this.playAgain,this,2,3,2);
        this.btnMainMenu=game.add.button(110,300,'button',this.mainMenu,this,4,5,4);
        this.btnStore=game.add.button(110,200,'button',this.Store,this,6,7,6);
        this.game.add.sprite (118, 100, "game");
   
        highScoreText = this.game.add.text(130, 150, 'HS: ' + highscore, {
            font: '25px Arial',
            fill: 'black'
        });

    },
    playAgain:function()
    {
        game.state.start("main");
    },

    mainMenu:function()
    {
        game.state.start("stateTitle");
    },

    Store:function()
    {
        game.state.start("characters");
    },
    update:function()
    {        

        highScoreText.text = 'HIGHSCORE: ' + localStorage.getItem("highscore");


            {
         if (this.score > localStorage.getItem("highscore")) 
            { 
                localStorage.setItem("highscore", this.score);
            }
        }

        
        
    },   
    
};