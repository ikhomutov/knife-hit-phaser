import Phaser from 'phaser'


export default class AppleCounter extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {

    super (scene, x, y)
    scene.add.existing(this)

    this.gameManager = scene.sys.game.gameManager
    this.scoreImage = scene.add.image(50, 0, 'apple_full')
    this.scoreText = scene.add.text(0, 0, this.gameManager.score, {
      font: '50px font1',
    }).setOrigin(1, 0.5)
    this.add(this.scoreImage)
    this.add(this.scoreText)
  }

  updateLabel () {
    this.scoreText.text = this.gameManager.score
  }
}