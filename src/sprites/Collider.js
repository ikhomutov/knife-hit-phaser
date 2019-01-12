import Phaser from 'phaser'


export default class Collider extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)
    scene.physics.add.existing(this);
    this.gameManager = scene.sys.game.gameManager
  }
}