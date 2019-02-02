import Phaser from 'phaser'

import AppleCounter from '../prefabs/AppleCounter'


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
    this.add.image(0, 0, 'game_bg').setOrigin(0)
    let settingsTitle = this.add.image(this.gameManager.centerX, 200, 'settings_title')

    let backBtn = this.add.image(50, 50, 'back_btn').setInteractive()
    backBtn.on('pointerdown', () => this.scene.start('TitleScene'))

    new AppleCounter(this, this.gameManager.width - 150, 50)

    let soundY = 350
    let textX = this.gameManager.centerX - settingsTitle.width / 2
    this.add.text(textX, soundY, 'SOUNDS', {font: '25px font1'}).setOrigin(0, 0.5)
    let buttonX = this.gameManager.centerX + settingsTitle.width / 2
    this.soundButton = this.add.image(buttonX, soundY, this.gameManager.soundOn? 'on_btn' : 'off_btn').setOrigin(1, 0.5)
    this.soundButton.setInteractive().on('pointerdown', this.triggerSound, this)

  }
  triggerSound() {
    this.gameManager.soundOn = !this.gameManager.soundOn
    this.soundButton.setTexture(this.gameManager.soundOn? 'on_btn' : 'off_btn')
  }
}