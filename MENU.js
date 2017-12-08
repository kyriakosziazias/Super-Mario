var MMENU = {
	preload: function() {

		game.load.image('MENU', 'assets/MENU.jpg');
		game.load.image('STAGE1', 'assets/STAGE1.jpg');
		game.load.audio('intro', 'assets/The XX - Intro (Original Version).mp3');
		},
		
		create: function() {
		
			intro = game.add.audio('intro');
			intro.play();

			game.scale.pageAlignHorizontally = true;
			game.scale.pageAlignVertically = true;
			game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
			game.physics.startSystem(Phaser.Physics.ARCADE);
			
			var MENUPic = game.add.sprite(8, 8, 'MENU');

			var STAGEText = game.add.text(38, 150, 'STAGE1', {fontSize: '12px', fill: '#000'});
			var click1 = game.add.button(60, 197, 'STAGE1', function() {
			game.state.start('STAGE1');
			intro.stop();
		});
		click1.anchor.set(0.5, 0.5);
	}
}
