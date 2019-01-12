import Phaser from 'phaser'


export default class SettingsScene extends Phaser.Scene {
  constructor () {
    super({key: 'SettingsScene'})
  }

  init() {
    this.gameManager = this.sys.game.gameManager
  }
  preload () {

  }
  create () {

  }
  update (time, delta) {

  }
}