var bird
var characters={    
    
   preload:function()
    {
       
      	game.load.spritesheet('button', 'assets/button.png', 215, 53, 8);
      	game.load.image("background", "assets/characterbackground.png");
      	game.load.image("bird", "assets/extra/bird2.png");
      	
    },
 
    create:function()
    {	

    	this.background = game.add.tileSprite(0, game.height-640,game.width, 640, 'background');
        this.background.autoScroll(-100,0);
    	this.btnMainMenu=game.add.button(110,500,'button',this.mainMenu,this,4,5,4);
        bird = game.add.image(0, 200, 'bird');
    
    	
    },

    mainMenu:function()
    {
        game.state.start("stateTitle");
    },
    update:function()
    {       
    	bird.x +=1;
        
    },    
    
};