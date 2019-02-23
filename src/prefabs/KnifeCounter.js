import Phaser from 'phaser'


export default class KnifeCounter extends Phaser.GameObjects.Container {
  constructor (scene, x, y) {
    super (scene, x, y)
    scene.add.existing(this)

    this.gameManager = scene.sys.game.gameManager
  }
  setUpCounter(totalKnives) {
    for (let i = 0; i < totalKnives; i++){
      this.add(this.scene.add.image(0, - i * 50, 'knife_white'))
    }
  }
  setSpawnedKnives(spawnedKnives) {
    for (let i = 0; i < spawnedKnives; i++) {
      this.getAt(i).setTexture('knife_blue')
    }
  }
}