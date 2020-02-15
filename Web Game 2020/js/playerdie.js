// the function that establishes the player and enemy collision.
// when player and enemy collide it'll do as the function says.
// these functions relies on the user pressing the spacebar before
// the collisions take place
function killEnemy(enemy, player) {
     if (meleeButton.isDown) { // when spacebar is pressed, carry out this condition
                  this.enemyHitSound.play();
          enemy.x = Phaser.Math.RND.between(100,800); // chooses a random x co-ordinate between 100-800 to respawn the enemy.
     enemy.y = 40
          this.points += 100; // adds 100 onto the total of points.
         text.destroy();
     text = this.add.text(100,10, 'Score: ', {
         fontFamily: 'Anton',
        fontSize: 30
     });
    if (meleeButton.isUp){ // when spacebar is not pressed, carry out this condition
         player.x = Phaser.Math.RND.between(100,800);
         player.y = 200;
     }

     }
     
     
 }

 function killPlayer(enemy, player) {
     if (meleeButton.isUp && lives >= 1){ // when spacebar is not pressed, carry out this condition 
         this.playerHitSound.play();
         player.x = Phaser.Math.RND.between(100,800); // kill player and respawn the player between x100-x800
         player.y = 200;
         text.destroy();
     text = this.add.text(100,10, 'Score: ', {
         fontFamily: 'Anton',
        fontSize: 30
     });
         lives -= 1; // takes away a life
         text3.destroy();
         text3 = this.add.text(420,10, 'Lives: ' + lives, {
         fontFamily: 'Anton',
        fontSize: 30
     });
     }
             
             else if (meleeButton.isUp && lives == 0){ // once player has no lives left, carry out the condition
                    this.gameoverSound.play();
                 player.body.destroy(); // essentially does not let the player carry on playing without refreshing page
                 enemy.body.destroy();
                 text4 = this.add.text(400,100, 'GAME OVER', { // placed in middle of screen
         fontFamily: 'Anton',
        fontSize: 30
        });
            text5 = this.add.text(400,150, 'Final Score: ' + this.points, {
         fontFamily: 'Anton',
        fontSize: 30
        
    });
             }
 }


