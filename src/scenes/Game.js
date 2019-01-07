import Phaser from 'phaser'

import Knife from '../sprites/Knife'
import Target from '../sprites/Target'
import Apple from '../sprites/Apple'


export default class GameScene extends Phaser.Scene {
  constructor () {
    super({key: 'GameScene'})
  }

  init() {
    this.applesCount = 4
    this.knife = null
    this.target = null
    this.gameManager = this.sys.game.gameManager
  }
  preload () {

  }
  create () {
    this.add.image(0, 0, 'game_bg').setOrigin(0)
    this.spawnKnife()
    this.spawnTarget()
    this.apples = this.add.group()
    for (let i = 0; i < this.applesCount; i++) {
      this.apples.add(new Apple(this, Phaser.Math.Between(0, 360)))
    }
    this.physics.add.overlap(this.knife, this.target, this.hitTarget)
    this.physics.add.overlap(this.knife, this.apples, (knife, apple) => apple.hit())
  }
  spawnKnife() {
    let knifeKey = "knife_" + this.gameManager.selectedKnife
    this.knife = new Knife(this, knifeKey)
  }
  spawnTarget() {
    let targetKey = this.gameManager.getTargetName()
    this.target = new Target(this, targetKey)
  }
  update (time, delta) {
    this.target.update(time, delta)
    this.updateApples(time, delta)
  }
  hitTarget (knife, target) {
    knife.reset()
    target.hit()
  }
  updateApples(time, delta){
    this.apples.children.iterate(function (apple) {
      apple.angle += this.gameManager.currentRotationSpeed
      let e = Phaser.Math.DegToRad(apple.angle - 90)
      apple.x = this.target.x + this.target.width / 2 * Math.cos(e)
      apple.y = this.target.y + this.target.width / 2 * Math.sin(e)
    }, this)
  }
}