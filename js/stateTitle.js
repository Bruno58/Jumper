var stateTitle={    
    
   preload:function()
    {
       game.load.image("logo", "assets/extra/Logo.png");
       game.load.image("title", "assets/title.png");
       game.load.spritesheet('button', 'assets/button.png', 215, 53, 8);
    },
    
    create:function()
    {
        this.title = game.add.tileSprite(0, game.height-640,game.width, 640, 'title');
        this.title.autoScroll(-100,0);

        this.btnStart=game.add.button(110,400,'button',this.startGame,this,0,1,0);
        this.btnStore=game.add.button(110,480,'button',this.Store,this,6,7,6);
        this.logo = game.add.sprite(60, 150, 'logo');

    },
    startGame:function()
    {
        game.state.start("main");

    },

    Store:function()
    {
        game.state.start("characters");
    },
    update:function()
    {       
        
    },    
    
};