// the function that establishes the player and coin collision.
// when player and coin collide it'll do as the function says.
function coinCollect(player, coin) {
     this.points += 50; // adds 50 onto the total of points.
     
     this.gemSound.play(); // plays 'gemSound' when the two collide.
     
         text.destroy();
     text = this.add.text(100,10, 'Score: ', { 
         fontFamily: 'Anton',
        fontSize: 30
     });
coin.x = Phaser.Math.RND.between(0,928) // chooses a random x co-ordinate between 0-928 to drop the coin.
     coin.y = 100 // a consistant y co-ordinate for the coin to be placed.

 }

 function coin2Collect(player, coin2) { // establishes a seperate function for a seperate coin asset.
   if (this.points >= 1000){ // establishes the condition.
     this.points += 150; // adds 150 onto the total of points.
       this.gem2Sound.play(); // plays 'gem2Sound' when the two collide.
   } else if (this.points <= 999){ // establishes the condition.
       this.points += 0; // doesn't allow any additional points being added.
   }
     
     
         text.destroy();
     text = this.add.text(100,10, 'Score: ', {
         fontFamily: 'Anton',
        fontSize: 30
     });
coin2.x = Phaser.Math.RND.between(0,928)
     coin2.y = 100;
     
     
 }

 function coin3Collect(player, coin3) {
     if (this.points >= 5000){
     this.points += 150;
              this.gem3Sound.play();
   } else if (this.points <= 4999){
       this.points += 0;
   }
     
     
         text.destroy();
     text = this.add.text(100,10, 'Score: ', {
         fontFamily: 'Anton',
        fontSize: 30
     });
coin3.x = Phaser.Math.RND.between(0,928)
    coin3.y = 100
    
     }



