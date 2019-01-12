import Collider from './Collider'
import Phaser from 'phaser'
import Apple from './Apple'
import Knife from './Knife'

export default class Target extends Collider {
  constructor(scene, key) {
    let x = scene.sys.game.config.width / 2
    let y = 400
    super(scene, x, y, key)
    this.setCircle(200);

    this.depth = 1
    this.knives = scene.add.group()
    this.apples = scene.add.group()
    this.setAngularVelocity(100)
  }
  update(time, delta) {
    this.updateApples(time, delta)
    this.updateKnives(time, delta)
  }
  addApple(angle) {
    let apple = new Apple(this.scene, angle)
    apple.startAngle = angle
    this.apples.add(apple)
  }
  addKnife(angle) {
    let angleRad = Phaser.Math.DegToRad(angle + 90)
    let x = this.x + this.width / 2 * Math.cos(angleRad)
    let y = this.y + this.width / 2 * Math.sin(angleRad)
    let knifeKey = "knife_" + this.gameManager.selectedKnife
    let knife = new Knife(this.scene, x, y, knifeKey)
    knife.startAngle = angle
    knife.angle = angle
    let knifeBodyRadius = 30
    knife.setCircle(knifeBodyRadius, 0.5 * knife.width - knifeBodyRadius, 0.5 * knife.height - knifeBodyRadius)
    knife.setOrigin(0.5)
    this.knives.add(knife)
  }
  updateApples(time, delta){
    this.apples.children.iterate(function (apple) {
      apple.angle = apple.startAngle + this.angle
      let e = Phaser.Math.DegToRad(apple.angle - 90)
      apple.x = this.x + this.width / 2 * Math.cos(e)
      apple.y = this.y + this.width / 2 * Math.sin(e)
    }, this)
  }
  updateKnives(time, delta){
    this.knives.children.iterate(function (knife) {
      knife.angle = knife.startAngle + this.angle
      let e = Phaser.Math.DegToRad(knife.angle + 90)
      knife.x = this.x + this.width / 2 * Math.cos(e)
      knife.y = this.y + this.width / 2 * Math.sin(e)
    }, this)
  }

  hit (knife) {
    this.gameManager.hits += 1
    this.knives.add(knife)
    this.scene.sound.play('hit_1')
    this.scene.tweens.add({
      targets: this,
      scaleY: .9,
      yoyo: true,
      duration: 100
    })

  }
}