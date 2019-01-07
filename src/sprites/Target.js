import Phaser from 'phaser'


export default class Target extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, key) {
    let x = scene.sys.game.config.width / 2
    let y = 400
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.physics.add.existing(this)
    this.gameManager = scene.sys.game.gameManager
  }
  update(time, delta) {
    this.angle += this.gameManager.currentRotationSpeed;
  }
  hit () {
    this.scene.sound.play('hit_1')
    this.scene.tweens.add({
      targets: this,
      scaleY: .9,
      yoyo: true,
      duration: 100
    })

  }
}