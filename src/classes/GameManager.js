export default class GameManager {
  constructor(game, options) {
    this.game = game
    this.width = options.width
    this.height = options.height
    this.centerX = options.width / 2
    this.centerY = options.height / 2
    this.debug = options.debug
    this.debugLevel = options.debugLevel
    this.debugBoss = options.debugBoss
    this.unlockNowCost = options.unlockNowCost
    this.unlockRandomCost = options.unlockRandomCost
    this._knivesRemain = 0
    this._hits = 0
    this._stage = 1
    this._sound = true
    this.isGameOver = false
  }
  get score() {
    return parseInt(localStorage.getItem('score')) || 0
  }
  set score(value) {
    localStorage.setItem('score', value)
  }
  get stage() {
    return this._stage
  }
  set stage(value) {
    this._stage = value
  }
  get highScore() {
    return parseInt(localStorage.getItem('highscore')) || 0
  }
  set highScore(value) {
    localStorage.setItem('highscore', value)
  }
  get sound() {
    return parseInt(localStorage.getItem('sound')) || 1
  }
  set sound(value) {
    localStorage.setItem('sound', value)
  }
  get selectedKnife() {
    let knife = parseInt(localStorage.getItem('knife'))
    if (!knife || !this.unlockedKnives.includes(knife)) return 1
    return knife
  }
  set selectedKnife(value) {
    localStorage.setItem('knife', value)
  }
  get unlockedKnives() {
    return JSON.parse(localStorage.getItem('unlocked_knives') || '[1]')
  }
  set unlockedKnives(array) {
    localStorage.setItem('unlocked_knives', JSON.stringify(array))
  }
}