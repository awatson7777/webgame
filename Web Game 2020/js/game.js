var config = {
    type: Phaser.AUTO,
    width: 928, // the dimensions of the background images I chose.
    height: 396,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 800
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
    
    
}
// sets up a controller for the audio that is assigned 'musicConfig'
var musicConfig = {
    mute: false,
    volume: 0.5,
    rate: 1,
    detune: 0,
    seek: 0,
    loop: true,
    delay: 0,
}

//establishing variables
var game = new Phaser.Game(config);
var background;
var ground;
var player;
var points = 0;
var highscore =0;
var highScoreText;
var lives = 3; // number of lives
var enemyMaxX = 800;
var enemyMinX = 100;
var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


function preload() {
    // assets for the background
    this.load.image('background', 'assets/background/layer1.png')
    this.load.image('background2', 'assets/background/layer2.png')
    this.load.image('background3', 'assets/background/layer3.png')
    this.load.image('background4', 'assets/background/layer4.png')
    this.load.image('background5', 'assets/background/layer5.png')
    this.load.image('background6', 'assets/background/layer6.png')
    this.load.image('background7', 'assets/background/layer7.png')
    this.load.image('background8', 'assets/background/layer8.png')
    this.load.image('background9', 'assets/background/layer9.png')
    this.load.image('ground', 'assets/gameFiles/ground.png')
    this.load.image('platform', 'assets/gameFiles/platform.png')
    
    // assets for sounds
    this.load.audio('jump', 'assets/sounds/jump.wav' );
    this.load.audio('song', 'assets/sounds/song.mp3' );
    this.load.audio('gem', 'assets/sounds/gem.wav' );
    this.load.audio('gameover', 'assets/sounds/gameover.wav' );
    this.load.audio('enemydie', 'assets/sounds/song.mp3' );
    this.load.audio('playerHit', 'assets/sounds/hit.wav' );
    this.load.audio('enemyHit', 'assets/sounds/enemyhit.wav' );
    this.load.audio('gameover', 'assets/sounds/song.mp3' );
    this.load.audio('gem2', 'assets/sounds/gem2.wav' );
    this.load.audio('gem3', 'assets/sounds/gem3.wav' );
   
   
    // assets for the interactive sprites
    coin = this.load.spritesheet('coin', 'assets/gems/MonedaD.png',{
        frameWidth: 16,
            frameHeight: 16 // selects the position in the spritesheet to display a singular sprite
    });
    
    coin2 = this.load.spritesheet('coin2', 'assets/gems/spr_coin_strip4.png',{
        frameWidth: 16,
            frameHeight: 16
    });
    
    coin3 = this.load.spritesheet('coin3', 'assets/gems/spr_coin_azu.png',{
        frameWidth: 16,
            frameHeight: 16
    });

    player = this.load.spritesheet('guy', 'assets/goodguy/goodguy.png', {
        frameWidth: 61,
        frameHeight: 57
    });

    enemy = this.load.spritesheet('enemy', 'assets/skeleton/Skeleton Attack.png', {
        frameWidth: 43,
        frameHeight: 39
    });

    
    
    
}

function create() {

 // adds the background assets to the scene
   background = this.add.image(464, 396, 'background');
  background = this.add.image(464, 0, 'background2');
  background = this.add.image(464, 0, 'background3');
  background = this.add.image(464, 0, 'background4');
  background = this.add.image(464, 0, 'background5');
  background = this.add.image(464, 0, 'background6');
  background = this.add.image(464, 0, 'background7');
  background = this.add.image(464, 0, 'background8');
 background = this.add.image(464, 0, 'background9');
    ground = this.physics.add.image(464, 390, 'ground'); // an invisible asset used for ground collision detection
    
    
    ground.body.setAllowGravity(false);
    ground.body.immovable = true;
    
    
    // to add different landscapes for the player to use to get gems
   platform = this.physics.add.image(600, 300, 'platform');// x, y co-ordinate setting

    platform.body.setAllowGravity(false);
    platform.body.immovable = true;
    
    platform2 = this.physics.add.image(520, 290, 'platform');

    platform2.body.setAllowGravity(false);
    platform2.body.immovable = true;
 
    platform3 = this.physics.add.image(440, 300, 'platform');

    platform3.body.setAllowGravity(false);
    platform3.body.immovable = true;
    
    player = this.physics.add.sprite(100, 300, 'guy').setScale(1.5); // increases the overall size of the sprite
    this.physics.add.collider(player, ground); // adds the colliders between different sprites and platforms
    this.physics.add.collider(player, platform);
    this.physics.add.collider(player, platform2);
    this.physics.add.collider(player, platform3);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    enemy = this.physics.add.sprite(1000, 300, 'enemy').setScale(2);
    this.physics.add.collider(enemy, ground);
    enemy.body.bounce.y = 0.2;
    enemy.body.gravity.y = 300;
    enemy.body.collideWorldBounds = true;

    coin = this.physics.add.sprite(350, 300, 'coin')
    this.physics.add.collider(coin, ground);
    this.physics.add.collider(coin, platform);
    this.physics.add.collider(coin, platform2);
    this.physics.add.collider(coin, platform3);
    coin.body.bounce.y = 0.2;
    coin.body.gravity.y = 300;
    coin.body.collideWorldBounds = true;
    
    coin2 = this.physics.add.sprite(800, 50, 'coin2').setScale(1.5);
    this.physics.add.collider(coin2, ground);
    coin2.body.bounce.y = 0.2;
    coin2.body.gravity.y = 300;
    coin2.body.collideWorldBounds = true;
    coin2.setVisible(false);// hides the asset until it is called
    
    coin3 = this.physics.add.sprite(600, 50, 'coin3').setScale(1.5);
    this.physics.add.collider(coin3, ground);
    coin3.body.bounce.y = 0.2;
    coin3.body.gravity.y = 300;
    coin3.body.collideWorldBounds = true;
    coin3.setVisible(false);
    
    // colliders
    this.physics.add.collider(coin2, platform);
    this.physics.add.collider(coin2, platform2);
    this.physics.add.collider(coin2, platform3);
        this.physics.add.collider(coin3, platform);
    this.physics.add.collider(coin3, platform2);
    this.physics.add.collider(coin3, platform3);
    
    // add the sounds to the scene
    
    this.jumpSound = this.sound.add("jump");
    this.gameoverSound = this.sound.add("gameover")
    this.song = this.sound.add("song");
    this.gemSound = this.sound.add("gem");
    this.gem2Sound = this.sound.add("gem2");
    this.gem3Sound = this.sound.add("gem3");
    this.playerHitSound = this.sound.add("playerHit");
    this.enemyHitSound = this.sound.add("enemyHit");
    
    
  

// play the sounds assigned to the audio controller
this.song.play(musicConfig);


                  this.physics.add.overlap(player, coin2, coin2Collect, null, this);// calls the function 'coin2collect' when player and coin2 collide
    this.physics.add.overlap(player, coin3,  coin3Collect, null, this); // calls the function 'coin3collect' when player and coin3 collide
                           
 
    
    
    this.physics.add.overlap(enemy, player, killEnemy, null, this); //calls the functions after the sprites collide
    this.physics.add.overlap(enemy, player, killPlayer, null, this);
    this.physics.add.overlap(player, coin, coinCollect, null, this);



// CREATE THE ANIMATIONS FROM THE SPRITESHEETS
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 1, // start on frame 1
            end: 2 // end on frame 2
        }),
        frameRate: 5,
        repeat: 0
    });
    
    this.anims.create({
        key:'coin',
        frames: this.anims.generateFrameNumbers('coin', {
            start: 0, // start on frame 0 and continue through all frames
            end: 4 // until frame 4
        }),
        frameRate: 5, // how fast the animation plays
        repeat: 0
    });
    
    this.anims.create({
        key:'coin2',
        frames: this.anims.generateFrameNumbers('coin2', {
            start: 0,
            end: 3
        }),
        frameRate: 5,
        repeat: 0
    });
    
    this.anims.create({
        key:'coin3',
        frames: this.anims.generateFrameNumbers('coin3', {
            start: 0,
            end: 3
        }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key:'enemy',
        frames: this.anims.generateFrameNumbers('enemy', {
            start: 0,
            end: 17
        }),
        frameRate: 20,
        repeat: 0
    });
    
    this.anims.create({
        key:'enemyleft',
        frames: this.anims.generateFrameNumbers('enemy', {
            start: 34,
            end: 18
        }),
        frameRate: 20,
        repeat: 0
    });
  
    
    this.anims.create({
        key:'enemyleft2',
        frames: this.anims.generateFrameNumbers('enemy', {
            start: 34,
            end: 18
        }),
        frameRate: 20,
        repeat: 0
    });
    

    
    
    this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 4,
            end: 4
        }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 3,
            end: 3
        }),
        frameRate: 5,
        repeat: 0
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 9,
            end: 10
        }),
        frameRate: 5,
        repeat: -1
    });

    this.anims.create({
        key: 'attack',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 1,
            end: 8
        }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'attack2',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 8,
            end: 1
        }),
        frameRate: 5,
        repeat: 0
    });

    this.anims.create({
        key: 'attack3',
        frames: this.anims.generateFrameNumbers('guy', {
            start: 0,
            end: 1
        }),
        frameRate: 5,
        repeat: 0
    });
    coin.anims.play ('coin', true);
    enemy.setVelocityX(200);

    text = this.add.text(100,10, 'Score: ', { //adds text to the screen 
        fontFamily: 'Anton',
        fontSize: 30

    });
    
     text3 = this.add.text(420,10, 'Lives: ' + lives, { //adds text to the screen with the real time updated life count
        fontFamily: 'Anton',
        fontSize: 30

    });
    
    highScoreText = this.add.text(680, 10, 'HS: ' + highscore, { //adds text to the screen with the real time updated highscore
      fontFamily: 'Anton',
        fontSize: 30
    });


this.points = 0;
    this.labelScore = this.add.text(180, 10, "0", //adds the real time updated current score
    { fontFamily: 'Anton',
        fontSize: 30 });
    
}

function update() {
    cursors = this.input.keyboard.createCursorKeys(); // establishes that the arrow keys will be used for controls
    meleeButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE); // enables the spacebar to be used for actions

    
    // CONTROLS
    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true)
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else if (cursors.left.isUp) {
        player.setVelocityX(0);
        player.anims.play('idle', true);
    }


 // ENEMY MOVEMENT RULES
        if(enemy.x >= enemyMaxX) {
            enemy.setVelocityX(-100);
            enemy.anims.play ('enemy', true);
            
        } else if (enemy.x <= enemyMinX) {
            enemy.setVelocityX(100);
            enemy.anims.play ('enemyleft', true);  

        }
    
     if(enemy.x < player.x){
         enemy.anims.play ('enemy', true);
         } else if (enemy.x > player.x){
           enemy.anims.play ('enemyleft', true);  
         }

// JUMP CONTROL    
    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-350);
        player.anims.play('jump', true);
        this.jumpSound.play();
        
    }
// ATTACK CONTROLS
    if (meleeButton.isDown && cursors.right.isDown && player.body.touching.down) { // both buttons need to be down to allow the animation to play
        player.anims.play('attack', true);

        
    }
    if (meleeButton.isDown && cursors.left.isDown && player.body.touching.down) {
        player.anims.play('attack2', true);

    }
    if (meleeButton.isDown && player.body.touching.down) {
        player.anims.play('attack3', true);

    }
   

    if (this.points >= 1000 && this.points <= 4999) {
        coin2.setVisible(true); // when the player's score increases the game gets more difficult as well as more points being available
        if(enemy.x >= enemyMaxX) {
            enemy.setVelocityX(-200);
            enemy.anims.play ('enemy', true);
            
        } else if (enemy.x <= enemyMinX) {
            enemy.setVelocityX(200);
            enemy.anims.play ('enemyleft', true);  

        }
    
    }
    
     if (this.points >= 5000) {
        coin3.setVisible(true); // the hardest the game gets
        if(enemy.x >= enemyMaxX) {
            enemy.setVelocityX(-300);
            enemy.anims.play ('enemy', true);
            
        } else if (enemy.x <= enemyMinX) {
            enemy.setVelocityX(300);
            enemy.anims.play ('enemyleft', true);  

        }
    
    }
    
    highScoreText.text = 'Highscore: ' + localStorage.getItem("highscore");
  {
     if (this.points > localStorage.getItem("highscore")) // keeps the highest score achieved will in the same computer session
        { 
            localStorage.setItem("highscore", this.points);
        }
    }
    

this.labelScore.text = this.points;  
     
 
//plays the coin animations on game start as there would be no function in specific to trigger them
coin.anims.play ('coin', true);
    coin2.anims.play ('coin2', true);
coin3.anims.play ('coin3', true);
}
