var STAGE1 =  {
		          preload: function() {
                this.load.spritesheet('tiles', 'assets/super_mario_tiles.png', 16,
				      16);
			          this.load.spritesheet('goomba', 'assets/goomba.png', 16, 16);
                this.load.spritesheet('mario', 'assets/wario.png', 16, 16);
                this.load.spritesheet('coin', 'assets/coin1.png', 16, 16);
                this.load.spritesheet('core', 'assets/core.png', 16, 16);
                
                this.load.tilemap('level', 'assets/super_mario_mapNEW.json', null,
					Phaser.Tilemap.TILED_JSON);
                
                //game sound
                
              this.load.audio('jump', 'audio/jump.wav');
              this.load.audio('coin', 'audio/coin.wav');
              this.load.audio('stomp', 'audio/stomp.wav');
              this.load.audio('bgm', 'audio/bgm.mp3');
              this.load.audio('death', 'audio/death.mp3');
              this.load.audio('core', 'audio/core.wav');
		},
  
  
  
		create: function() {
			      Phaser.Canvas.setImageRenderingCrisp(game.canvas)
			      game.stage.backgroundColor = '#5c94fc';
			      map = game.add.tilemap('level');
            		      map.addTilesetImage('tiles', 'tiles');
			      map.setCollisionBetween(3, 12, true, 'solid');
        		      map.setCollisionBetween(3, 12, true, 'pipe');
                              map.createLayer('background');
			      pipe = map.createLayer('pipe');
                              pipe.resizeWorld();
        
			      layer = map.createLayer('solid');
			      layer.resizeWorld();
            coins = game.add.group();
            coins.enableBody = true;
            map.createFromTiles(2, null, 'coin', 'stuff', coins);
            coins.callAll('animations.add', 'animations', 'spin',
                [ 0, 0, 1, 2 ], 3, true);
            coins.callAll('animations.play', 'animations', 'spin');
            goombas = game.add.group();
            goombas.enableBody = true;
            map.createFromTiles(1, null, 'goomba', 'stuff', goombas);
            goombas.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
					2, true);
            goombas.callAll('animations.play', 'animations', 'walk');
            goombas.setAll('body.bounce.x', 1);
            goombas.setAll('body.velocity.x', -20);
            goombas.setAll('body.gravity.y', 500);

        //new enemy
            cores = game.add.group();
	    cores.enableBody = true;
            map.createFromTiles(1, null, 'core', 'core', cores);
            cores.callAll('animations.add', 'animations', 'walk', [ 0, 1 ],
                2, true);
            cores.callAll('animations.play', 'animations', 'walk');
            cores.setAll('body.bounce.x', 1);
            cores.setAll('body.velocity.x', -50);
            cores.setAll('body.gravity.y', 700);
            
            
            player = game.add.sprite(16, game.world.height - 48, 'mario');
            game.physics.arcade.enable(player);
            player.body.gravity.y = 370;
            player.body.collideWorldBounds = true;
            player.animations.add('walkRight', [ 1, 2, 3 ], 10, true);
            player.animations.add('walkLeft', [ 8, 9, 10 ], 10, true);
            player.animations.add('Teleport', [10],10,false);
	    player.goesRight = true;
            
         //game sounds
            soundjump = game.add.sound('jump');
            soundcoin = game.add.sound('coin');
            soundstomp = game.add.sound('stomp');
            soundcore = game.add.sound('core');
            
            soundtrack = game.add.sound('bgm');
            soundtrack.loop=true;
            soundtrack.play();
            
            death = game.add.sound('death');
  
         //score text
            scoreText=game.add.text(8,4,'SCORE:'+score,{font:'Comic Sans MS' 			 ,fontSize: '16px', fill: 'red'} );
            scoreText.fixedToCamera=true;
          
         //marios lives
            
            livesCounter=game.add.text(130,4,'LIVES:'+lives,{font:'Comic 				Sans MS' ,fontSize: '16px', fill: 'yellow'});
			      livesCounter.fixedToCamera=true;
			
			      game.camera.follow(player);
			      cursors = game.input.keyboard.createCursorKeys();
            
            if(lives==3){
            alert("GO GO GO!!");
            }
          }
	  
	  update: function() {
         	game.physics.arcade.collide(player,pipe,pipeOverlap);
			game.physics.arcade.collide(player, layer);
			game.physics.arcade.collide(goombas, layer);
			game.physics.arcade.overlap(player, goombas, goombaOverlap);
            game.physics.arcade.collide(cores, layer);
			game.physics.arcade.overlap(player, cores, coreOverlap);
			game.physics.arcade.overlap(player, coins, coinOverlap);
		  
		  if (player.body.enable) {
				player.body.velocity.x = 0;
				if (cursors.left.isDown) {
					player.body.velocity.x = -90;
					player.animations.play('walkLeft');
					player.goesRight = false;
				} else if (cursors.right.isDown) {
					player.body.velocity.x = 90;
					player.animations.play('walkRight');
					player.goesRight = true;
				} else {
					player.animations.stop();
					if (player.goesRight)
						player.frame = 0;
					else
						player.frame = 7;
				}
				if (cursors.up.isDown && player.body.onFloor()) {
					player.body.velocity.y = -190;
                    soundjump.play();
					
					player.animations.stop();
				}
				if (player.body.velocity.y != 0) {
					if (player.goesRight)
						player.frame = 5;
					else
						player.frame = 12;
				}
			}
		}
	  
	  
