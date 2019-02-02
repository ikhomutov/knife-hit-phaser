export default class SoundManager {
  constructor(game) {
    this.game = game
  }

  playSfx(scene, key) {
    if (this.game.gameManager.soundOn) {
      scene.sound.play(key)
    }
  }
}
