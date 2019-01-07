import Phaser from 'phaser'


export default class Knife extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, key) {
    let x = scene.sys.game.config.width / 2
    let y = scene.sys.game.config.height / 5 * 4
    super(scene, x, y, key)
    this.startX = x
    this.startY = y
    scene.add.existing(this);
    scene.physics.add.existing(this)

    this.tween = scene.tweens.add({
      targets: this,
      y: scene.sys.game.config.height - this.height,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });
    scene.input.on("pointerdown", this.throw, this);

  }
  throw () {
    this.scene.sound.play('throw_1');
    this.tween.pause()
    this.setVelocityY(-2000)
  }
  reset () {
    this.setVelocityY(0)
    this.x = this.startX
    this.y = this.startY
    this.tween.resume()

  }
}