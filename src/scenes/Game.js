import Phaser from 'phaser'

import Knife from '../sprites/Knife'
import Target from '../sprites/Target'


export default class GameScene extends Phaser.Scene {
  constructor () {
    super({key: 'GameScene'})
  }

  init() {
    this.currentRotationSpeed = 2
  }
  preload () {

  }
  create () {
    this.add.image(0, 0, 'home_bg').setOrigin(0)
    this.knife = new Knife(this, this.sys.game.config.width / 2, this.sys.game.config.height / 5 * 4, "knife_1")
    this.target = new Target(this, this.sys.game.config.width / 2, 400, "enemy_1")

  }
  update (time, delta) {
    this.target.angle += this.currentRotationSpeed;
  }
}