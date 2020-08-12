import Phaser from "phaser";
import mp3 from "./assets/Orbital\ Colossus.mp3";
import tiles from "./assets/scifi_platformTiles_32x32.png";

// JC
import background from "./assets/field.svg";
import dragon from "./assets/dragon.png";
import fireball from "./assets/fireball.png";
import knight from "./assets/knight.png";

var speed1;
var movingFireball;
var movingKnight;
var jumpButton;

var config = {
  /*
    The type property can be either Phaser.CANVAS, Phaser.WEBGL, or Phaser.AUTO. This is the rendering context that you
    want to use for your game. The recommended value is Phaser.AUTO which automatically tries to use WebGL, but if the
    browser or device doesn't support it it'll fall back to Canvas. The canvas element that Phaser creates will be 
    simply be appended to the document at the point the script was called, but you can also specify a parent container 
    in the game config should you wish.
  */
  type: Phaser.AUTO,
  width: 800, // 800px
  height: 600, // 600px
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: {
    preload: function preload() {
      // this.load.setBaseURL("http://labs.phaser.io");

      // JC
      this.load.image("background", background);
      this.load.image('dragon', dragon);
      this.load.image('fireball', fireball);
      this.load.image('knight', knight);

      /*
        Due to different browsers supporting different audio file types you should usually provide your audio files in a
        variety of formats. ogg, mp3 and m4a are the most common. If you provide an array of URLs then the Loader will
        determine which one file to load based on browser support.
      */
      this.load.audio({
        key: 'music',
        url: [mp3 /*, ogg, m4a */] // import more files and add here for more support
      });
      // this.load.spritesheet('tiles', tiles, {
      //   frameWidth: 32,
      //   frameHeight: 32
      // });
    },
    create: function create() {
      //this.sound.play('music');
      this.add.image(400, 300, "background");

      //var box = this.physics.add.image(400, 100, "tiles", 15);

      // box.setVelocity(100, 200);
      // box.setBounce(1, 1);
      // box.setCollideWorldBounds(true);

      // JC: add dragon image
      this.add.image(25, 500, 'dragon').setOrigin(0);
      movingFireball = this.physics.add.image(120, 520, 'fireball').setOrigin(0);

      // JC: add knight image, movement      
      movingKnight=this.physics.add.image(700, 500, 'knight').setOrigin(0);
      movingKnight.setCollideWorldBounds(true);
      // movingKnight.setBounce(1, 1);
      movingKnight.keys=this.input.keyboard.createCursorKeys();

      // JC: add speed var
      speed1 = Phaser.Math.GetSpeed(600, 2);

      console.log('above processCollision');

      const processCollision = (movingFireball, movingKnight) => {
        console.log('entered processCollision');
        movingKnight.destroy();
        // const starsLeft = stars.countActive();
        // if (starsLeft === 0) {
        //   this.scene.start('winscreen');
        // }
      }
  
      this.physics.add.collider(
        movingFireball,
        movingKnight,
        processCollision,
        null,
        this
      );

      

    },
    update: function (time, delta) {
      movingFireball.x += speed1 * delta;
      if (movingFireball.x > 864) {
        movingFireball.x = 64;
      }

      if (movingKnight.keys.left.isDown) {
        movingKnight.x -= 5;
        movingKnight.keys.left.isDown=false;
        console.log('left pressed down');
      }
    


    },
  },
};

var game = new Phaser.Game(config);
