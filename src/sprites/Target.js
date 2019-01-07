import Phaser from 'phaser'


export default class Target extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    scene.add.existing(this)

  }
}