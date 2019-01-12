import Phaser from 'phaser'
import Score from "../prefabs/Score";


export default class ShopScene extends Phaser.Scene {
  constructor () {
    super({key: 'ShopScene'})
  }

  init() {
    this.gameManager = this.sys.game.gameManager
  }
  preload () {

  }
  create () {
    new Score(this, this.gameManager.width - 150, 50)

  }
  update (time, delta) {

  }
}