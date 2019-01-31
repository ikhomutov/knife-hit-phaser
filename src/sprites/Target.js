import Collider from './Collider'
import Phaser from 'phaser'
import Apple from './Apple'
import Knife from './Knife'

export default class Target extends Collider {
  constructor(scene, key, levelInfo) {

    let x = scene.sys.game.config.width / 2
    let y = 400
    super(scene, x, y, key)
    this.currentLevel = levelInfo
    this.totalKnives = 5
    this.setCircle(200);
    this.depth = 1
    this.knives = scene.add.group()
    this.apples = scene.add.group()
    this.setAngularVelocity(100)
    if (this.currentLevel['applesPossibility'] > Math.random()){
      this.spawnApples()
    }
    this.spawnKnives()
  }
  update(time, delta) {
    this.updateApples(time, delta)
    this.updateKnives(time, delta)
  }
  spawnApples() {
    this.currentLevel['applesAngles'].forEach((angle) => {
      let apple = new Apple(this.scene, this.x, this.y)
      apple.startAngle = angle
      apple.angle = angle
      this.apples.add(apple)
    }, this)
  }
  spawnKnives() {
    this.currentLevel['knivesAngles'].forEach((angle) => {
      this.addKnife('knife', angle)
    }, this)
  }
  addKnife(key, angle) {
    let knife = new Knife(this.scene, this.x, this.y, key)
    knife.startAngle = angle
    knife.angle = angle
    let knifeBodyRadius = 30
    knife.setCircle(knifeBodyRadius, 0.5 * knife.width - knifeBodyRadius, 0.5 * knife.height - knifeBodyRadius)
    knife.setOrigin(0.5)
    knife.flipY = true
    this.knives.add(knife)
  }
  updateApples(time, delta){
    this.apples.children.iterate(function (apple) {
      apple.angle = apple.startAngle + this.angle
      this.setPosOnTarget(this, apple, apple.angle, apple.height / 2)
    }, this)
  }
  updateKnives(time, delta){
    this.knives.children.iterate(function (knife) {
      knife.angle = knife.startAngle + this.angle
      this.setPosOnTarget(this, knife, knife.angle)
    }, this)
  }
  setPosOnTarget(target, obj, angle, space = 0) {
    angle = angle - 90
    let e = Phaser.Math.DegToRad(angle)
    obj.x = target.x + (target.width / 2 + space) * Math.cos(e)
    obj.y = target.y + (target.width / 2 + space) * Math.sin(e)
  }
  hit (knife) {
    this.gameManager.hits += 1
    console.log(this.angle)
    this.addKnife(knife.texture.key)
    knife.destroy()
    // this.knives.add(knife)
    this.scene.sound.play('hit_1')
    this.scene.tweens.add({
      targets: this,
      scaleY: .9,
      yoyo: true,
      duration: 100
    })


  }
}