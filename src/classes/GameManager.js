export default class GameManager {
  constructor(game, options) {
    this.game = game
    this.width = options.width
    this.height = options.height
    this.centerX = options.width / 2
    this.centerY = options.height / 2
    this.score = 0
    this.knivesRemain = 0
    this.hits = 0
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