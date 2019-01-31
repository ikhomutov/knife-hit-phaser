export default class SoundManager {
  constructor(game) {
    this.game = game
  }

  playSfx(scene, key, vol) {
    if (!this.game.gameManager.sound) {
      console.log('soundOff')
      return
    }

    let data = {
      volume: vol || 1
    };

    return scene.sound.play(key, data);
  }
}
