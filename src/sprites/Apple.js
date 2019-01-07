import Phaser from 'phaser'


export default class Apple extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, angle) {
    let angleRad = Phaser.Math.DegToRad(angle);
    let x = scene.target.x + scene.target.width / 2 * Math.cos(angleRad)
    let y = scene.target.y + scene.target.width / 2 * Math.sin(angleRad)

    super(scene, x, y, 'apple_full')
    console.log(scene.target.width)
    scene.add.existing(this);
    scene.physics.add.existing(this)

    this.setOrigin(.5, 1)
    this.angle = angle
    this.startAngle = angle
    this.depth = 1
  }
  hit () {
    this.scene.sound.play('apple_hit_1')
    this.destroy()
  }
}