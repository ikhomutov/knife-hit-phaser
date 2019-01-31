import Phaser from 'phaser'


export default class ShopCounter extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {

    super (scene, x, y)
    scene.add.existing(this)

    this.gameManager = scene.sys.game.gameManager
    this.knifeCounterSprite = scene.add.image(0, 0, 'shop_counter')
    this.knifeCounterText = scene.add.text(20, 0, '0/20', {font: '25px font1'}).setOrigin(0.5, 0.5)
    this.add(this.knifeCounterSprite)
    this.add(this.knifeCounterText)
    this.updateLabel()
  }
  updateLabel() {
    this.knifeCounterText.text = this.gameManager.unlockedKnives.length + '/20'
  }
}