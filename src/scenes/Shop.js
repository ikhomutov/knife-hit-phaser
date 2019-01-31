import Phaser from 'phaser'
import AppleCounter from '../prefabs/AppleCounter'
import ShopCounter from '../prefabs/ShopCounter'


export default class ShopScene extends Phaser.Scene {
  constructor () {
    super({key: 'ShopScene'})
  }

  init() {
    this.gameManager = this.sys.game.gameManager
    this.soundManager = this.sys.game.soundManager
  }
  preload () {

  }
  create () {
    this.add.image(0, 0, 'game_bg').setOrigin(0)
    this.add.image(this.gameManager.centerX, 400, 'shop_title')

    let backBtn = this.add.image(50, 50, 'back_btn').setInteractive()
    backBtn.on('pointerdown', () => this.scene.start('TitleScene'))

    let unlockNowButton = this.add.image(0, 0, 'unlock_now_btn')
    let unlockNowApple = this.add.image(60, 5, 'apple_full').setScale(0.5).setOrigin(0.5, 1)
    let unlockNowCost = this.add.text(60, 5, this.gameManager.unlockNowCost, {
      font: '25px font1',
    }).setOrigin(0.5, 0)
    let unlockNow = this.add.container(
      600, 200, [unlockNowButton, unlockNowApple, unlockNowCost]
    ).setSize(unlockNowButton.width, unlockNowButton.height).setInteractive()

    unlockNow.on('pointerdown', () => this.unlockNow())

    let unlockRandomButton = this.add.image(0, 0, 'unlock_random_btn')
    let unlockRandomApple = this.add.image(120, 5, 'apple_full').setScale(0.7).setOrigin(0.5, 1)
    let unlockRandomCost = this.add.text(120, 5, this.gameManager.unlockRandomCost, {
      font: '30px font1',
    }).setOrigin(0.5, 0)
    let unlockRandom = this.add.container(
      this.gameManager.centerX, 1200, [unlockRandomButton, unlockRandomApple, unlockRandomCost]
    ).setSize(unlockRandomButton.width, unlockRandomButton.height).setInteractive()

    unlockRandom.on('pointerdown', () => this.unlockRandom())

    this.selectedKnife = this.gameManager.selectedKnife

    this.currentKnife = this.add.image(this.gameManager.centerX, 200, 'knife_' + this.selectedKnife)

    this.shopCounter = new ShopCounter(this, 100, 200)
    this.appleCounter = new AppleCounter(this, this.gameManager.width - 150, 50)

    this.unlockedKnives = this.gameManager.unlockedKnives

    this.shopItems = this.add.container(150, 510)
    for (let i = 1; i < 21; i++) {
      let itemBox = this.add.image(0, 0, 'shop_item_bg')

      let itemKnife = this.add.image(0, 0, 'knife_' + i).setOrigin(0.5).setScale(0.4).setName('knife')
      let itemBorder = this.add.graphics()
      itemBorder.lineStyle(15, 0x5ACCE6, 1)
      itemBorder.strokeRect(-itemBox.width / 2, -itemBox.height / 2, itemBox.width, itemBox.height)
      itemBorder.setName('border')
      let item = this.add.container(0, 0, [itemBorder, itemBox, itemKnife])
      item.setSize(itemBox.width, itemBox.height).setInteractive()
      item.on('pointerdown', () => this.select(i), this)

      if (this.unlockedKnives.includes(i)) {
        item.isUnlocked = true
      } else {
        item.isUnlocked = false
        itemKnife.setTintFill(0x234D66)
      }

      this.shopItems.add(item)
    }

    Phaser.Actions.GridAlign(this.shopItems.getAll(), {
      width: 4,
      height: 5,
      cellWidth: 140,
      cellHeight: 135,
      position: 6
    })

    this.select(this.selectedKnife)

  }

  select(index) {
    this.shopItems.each((item) => item.getByName('border').alpha = 0)
    this.shopItems.getAt(index - 1).getByName('border').setAlpha(1)
    if (this.selectedKnife !== index) {
      this.selectedKnife = index

      this.currentKnife.setTexture('knife_' + index)
      if (this.unlockedKnives.includes(index)) {
        this.soundManager.playSfx(this, 'shop_select_item')
        this.gameManager.selectedKnife = index
        this.currentKnife.clearTint()
      } else {
        this.soundManager.playSfx(this, 'shop_select_locked_item')
        this.currentKnife.setTintFill(0x234D66)
      }

    }
  }

  unlockNow() {
    let unlockCost = this.gameManager.unlockNowCost
    if (this.gameManager.score < unlockCost) return
    if (this.unlockedKnives.length === 20) return
    if (this.unlockedKnives.includes(this.shopItems.selectedKnife)) return

    this.unlockByIndex(this.selectedKnife, unlockCost)
    this.select(this.selectedKnife)
    this.currentKnife.clearTint()

  }

  unlockRandom() {
    let unlockCost = this.gameManager.unlockRandomCost
    if (this.gameManager.score < unlockCost) return
    if (this.unlockedKnives.length === 20) return
    let availableForSelect = []
    for (let i = 1; i < 21; i++) {
      if (!this.unlockedKnives.includes(i)) {
        availableForSelect.push(i)
      }
    }
    let randomIndex = availableForSelect[Phaser.Math.Between(0, availableForSelect.length - 1)]
    this.unlockByIndex(randomIndex, unlockCost)
  }
  unlockByIndex(knifeIndex, cost) {
    this.unlockedKnives.push(knifeIndex)
    this.shopItems.getAt(knifeIndex - 1).getByName('knife').clearTint()
    this.gameManager.unlockedKnives = this.unlockedKnives
    this.gameManager.score -= cost
    this.shopCounter.updateLabel()
    this.appleCounter.updateLabel()
    this.soundManager.playSfx(this, 'shop_unlock')

  }
}