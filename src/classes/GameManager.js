export default class GameManager {
  constructor(game, options) {
    this.game = game
    this.currentRotationSpeed = options.startRotationSpeed
    this.maxRotationSpeed = options.maxRotationSpeed
    this.score = 0
    this.knivesRemain = 0
    this.level = 5
    this.selectedKnife = 5
    this.soundOn = true
  }
  getTargetName() {
    if (this.level % 5 === 0) {
      // spawn boss
      return 'boss_' + this.level / 5
    } else {
      return this.level < 15 ? 'enemy_1' : 'enemy_2'
    }

  }
}