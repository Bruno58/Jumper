var score =0;
var highscore =0;
var highScoreText;
var scoreText;

var MainState = {



	//load the game assets before the game starts
	preload: function () {                                                    /////////////////////////////preload
		this.load.image('background', 'assets/city.png');
		this.load.image('bird', 'assets/bird.png');
		game.load.image('pipe', 'assets/pipe.png');
		
		
	},
 

	 





	//executed after everything is loaded
	create: function () {                                                 
		
		this.background = this.game.add.sprite(0, 0, 'background');
		
		this.currentHighScore = localStorage.getItem("highscore");

		

		 highScoreText = this.game.add.text(600, 40, 'HS: ' + highscore, {
            font: '25px Arial',
            fill: 'black'
        });
        


		/////Bird///////////////////////////////////////////////////
		this.bird = this.game.add.sprite(100, 200, 'bird');
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.arcade.enable(this.bird);
		this.bird.body.gravity.y = 1000;
		var spaceKey = game.input.keyboard.addKey(
                    Phaser.Keyboard.SPACEBAR);
		game.input.onDown.add(this.jump, this); //////touch screen jump
    	spaceKey.onDown.add(this.jump, this);
    	this.bird.body.collideWorldBounds=true;
    	this.bird.body.immovable= true;

    	
	
		///////////////////////////////////////////////////////Pipes
		this.pipes = game.add.group();

		//timer
		this.timer = game.time.events.loop(1400, this.addRowOfPipes, this);   /////////////timer for pipes
		
		///////////////////////////////////////////////////////Score
		this.score = -1;
		this.labelScore = game.add.text(20, 20, "0", 
    	{ font: "30px Arial", fill: "black" });

		

		
		




	},






	// this is execated multiple times per second
	update: function () {                                           //////////////////////////////////////////////////update
		if (this.bird.y < 0 || this.bird.y > 480)	
       	game.state.start("StateOver");
    
    	

    	

    	///Collision
		game.physics.arcade.overlap(
    	this.bird, this.pipes, this.restartGame, null, this);
		

		////////////////////////////////////////////////////////////////////////// Highscore counter
		highScoreText.text = 'HS: ' + this.currentHighScore;


            {
         if (this.score > this.currentHighScore) 
            { 
                this.currentHighScore = this.score;
            }
        }
	
        

		
	}, 
	
	jump: function () {
		//this is for so the bird wount fly once dead
	if (this.bird.alive == false)
    return;
	 
	///sound
	///this.jumpSound.play();

    // Add a vertical velocity to the bird
    this.bird.body.velocity.y = -350;

    // Jump Animation
    var animation = game.add.tween(this.bird);
    // Change the angle of the bird to -20° in 100 milliseconds
	animation.to({angle: -20}, 100);

	// And start the animation
	animation.start(); 

	game.add.tween(this.bird).to({angle: -20}, 100).start();
	},

	

	restartGame: function () {
    // Start the 'main' state, which restarts the game
    game.state.start(game.state.current);
    ///Hit pipe Null
    game.physics.arcade.overlap(
    this.bird, this.pipes, this.hitPipe, null, this);

    

},



addRowOfPipes: function() {

	var hole = Math.floor(Math.random() * 5) + 1; ///Math.floor(Math.random() * 5) + 1; 

	for (var i = 0; i < 10 ; i++)                ///// (var i = 0; i < 8; i++)
       if (i != hole && i != hole + 1)          ///// if (i != hole && i != hole + 1)
            this.addOnePipe(440, i * 50 );   ///// 640 starting point of pipe 240 point of down ////this.addOnePipe(480, i * 60 + 10);
     
    ///Score for pipes    
    this.score += 1;
    this.labelScore.text = this.score;	
    
        
},



addOnePipe: function(x, y) {
	var pipe = game.add.sprite(x, y, 'pipe');

	this.pipes.add(pipe);

	game.physics.arcade.enable(pipe);

	pipe.body.velocity.x = -200;

	pipe.checkWorldBounds = true;

	pipe.outOfBoundsKill = true;

},


hitPipe: function() {
    // If the bird has already hit a pipe, do nothing
    // It means the bird is already falling off the screen
    

    if (this.bird.alive == false)
        return;

    localStorage.setItem("highscore", this.score);

    // Set the alive property of the bird to false
    this.bird.alive = false;

    // Prevent new pipes from appearing
    game.time.events.remove(this.timer);

    // Go through all the pipes, and stop their movement
    this.pipes.forEach(function(p){
        p.body.velocity.x = 0;
    }, this);

    	game.state.start("StateOver");
   
  

    
    
   
}, 



   
    


};

// Initilate the Phaser Framework
var game = new Phaser.Game(480, 640, Phaser.AUTO);
game.state.add("main", MainState);
game.state.add("stateTitle", stateTitle);
game.state.add("StateOver", StateOver);
game.state.add("characters", characters);
game.state.start("stateTitle"); 

