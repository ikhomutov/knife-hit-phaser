import Phaser from 'phaser'

import Knife from '../sprites/Knife'
import Target from '../sprites/Target'
import Score from "../prefabs/Score";


export default class GameScene extends Phaser.Scene {
  constructor () {
    super({key: 'GameScene'})
  }

  init() {
    this.applesCount = 1
    this.knivesCount = 1
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
    for (let i = 0; i < this.knivesCount; i++) {
      this.target.addKnife(Phaser.Math.Between(0, 360))
    }

    for (let i = 0; i < this.applesCount; i++) {
      this.target.addApple(Phaser.Math.Between(0, 360))
    }
    this.input.on("pointerdown", this.knife.throw, this.knife);
    this.physics.add.overlap(this.knife, this.target.apples, (knife, apple) => {apple.hit()});
    new Score(this, this.gameManager.width - 150, 50)

  }
  spawnKnife() {
    let knifeKey = "knife_" + this.gameManager.selectedKnife
    let x = this.sys.game.config.width / 2
    let y = this.sys.game.config.height / 5 * 4

    this.knife = new Knife(this, x, y, knifeKey)

  }
  hitApple(knife, apple) {
    apple.hit()
  }
  spawnTarget() {
    let targetKey = this.gameManager.getTargetName()
    this.target = new Target(this, targetKey)
  }
  update (time, delta) {
    this.target.update(time, delta)
  }
}