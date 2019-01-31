import Phaser from 'phaser'

import AppleCounter from '../prefabs/AppleCounter'

export default class TitleScene extends Phaser.Scene {
  constructor() {
    super({key: 'TitleScene'})
  }

  init() {
    this.gameManager = this.sys.game.gameManager
  }

  preload() {

  }

  create() {
    this.add.image(0, 0, 'title_bg').setOrigin(0)
    this.add.image(this.gameManager.centerX, 200, 'title_logo', 'knife').setAngle(-15)
    this.add.image(this.gameManager.centerX, 300, 'title_logo', 'logo')
    this.add.image(this.gameManager.centerX + 10, 400, 'title_logo', 'hit').setAngle(-10)

    this.add.image(this.gameManager.centerX, this.gameManager.centerY, 'knife_' + this.gameManager.selectedKnife)

    let playBtnY = this.gameManager.height - this.gameManager.height / 3
    let playBtn = this.add.image(this.gameManager.centerX, playBtnY, 'play_btn').setInteractive()
    playBtn.on('pointerdown', () => this.scene.start('GameScene'))

    let shopBtn = this.add.image(this.gameManager.centerX - 100, playBtnY + 150, 'shop_btn').setInteractive()
    shopBtn.on('pointerdown', () => this.scene.start('ShopScene'))

    let settingsBtn = this.add.image(this.gameManager.centerX + 100, playBtnY + 150, 'settings_btn').setInteractive()
    settingsBtn.on('pointerdown', () => this.scene.start('SettingsScene'))

    new AppleCounter(this, this.gameManager.width - 150, 50)
  }
}