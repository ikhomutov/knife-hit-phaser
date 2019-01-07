import Phaser from 'phaser'


export default class Knife extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)

    scene.tweens.add({
      targets: this.knife,
      y: scene.sys.game.config.height - this.height,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

  }
}