import Phaser from 'phaser'


export default class Score extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super (scene, x, y)
    scene.add.existing(this)

    this.gameManager = scene.sys.game.gameManager
    this.scoreImage = scene.add.image(60, 0, 'apple_full')
    this.scoreText = scene.add.text(0, 0, this.gameManager.score, {
      font: '50px font1',
    }).setOrigin(0.5)
    this.add(this.scoreImage)
    this.add(this.scoreText)
  }
}