import Phaser from 'phaser'

import Knife from '../sprites/Knife'
import Target from '../sprites/Target'
import AppleCounter from "../prefabs/AppleCounter";
import KnifeCounter from '../prefabs/KnifeCounter'


export default class GameScene extends Phaser.Scene {
  constructor () {
    super({key: 'GameScene'})
  }

  init() {
    this.applesCount = 1
    this.knivesCount = 1
    this.knife = null
    this.target = null
    this.gameManager = this.sys.game.gameManager
    this.soundManager = this.sys.game.soundManager
    let levelsInfo = this.cache.json.get('levels')
    this.bossesInfo = levelsInfo['bosses']
    this.stagesInfo = levelsInfo['stages']
  }
  preload () {

  }
  create () {
    this.add.image(0, 0, 'game_bg').setOrigin(0)
    this.appleCounter = new AppleCounter(this, this.gameManager.width - 150, 50)
    this.knifeCounter = new KnifeCounter(this, 100, this.gameManager.centerY + 500)

    this.gameManager.stage = 1
    if (this.gameManager.debug) {
      this.gameManager.stage = this.gameManager.debugLevel
    }
    this.setupGame()
    this.input.on("pointerdown", this.throwKnife, this);

  }
  update (time, delta) {
    this.target.update(time, delta)
  }
  setupGame() {
    this.spawnTarget()
    this.knifeCounter.setUpCounter(this.target.totalKnives)
    this.spawnedKnives = 0

    this.spawnKnife()
  }
  spawnKnife() {
    if (!this.gameManager.isGameOver && this.target.totalKnives > this.spawnedKnives && !this.knife) {
      this.spawnedKnives += 1
      let knifeKey = "knife_" + this.gameManager.selectedKnife
      let x = this.sys.game.config.width / 2
      let y = this.sys.game.config.height / 5 * 4

      this.knife = new Knife(this, x, y, knifeKey)
      this.physics.add.overlap(this.target.apples, this.knife, this.hitApple, null, this);
      this.physics.add.overlap(this.target, this.knife, this.hitTarget, null, this);
      this.physics.add.overlap(this.target.knives, this.knife, this.hitKnife, null, this);
    }
  }
  spawnTarget() {
    const currentStage = this.gameManager.stage
    let key, randomLevels
    if (currentStage % 5 === 0) {
      let bossInfo = this.bossesInfo[Phaser.Math.Between(0, this.bossesInfo.length - 1)]
      if (this.gameManager.debug) {
        bossInfo = this.bossesInfo[this.gameManager.debugBoss - 1]
      }
      key = 'boss_' + bossInfo['bossIndex']
      randomLevels = bossInfo['randomLevels']
    } else {
      key = currentStage < 15 ? 'enemy_1' : 'enemy_2'
      const stageInfo = this.stagesInfo[currentStage]
      randomLevels = stageInfo['randomLevels']
    }
     let levelInfo = randomLevels[Phaser.Math.Between(0, randomLevels.length - 1)]

    this.target = new Target(this, key, levelInfo)
  }
  throwKnife() {
    if (!this.knife || this.knife.isFire) {
      return
    }
    this.knifeCounter.setSpawnedKnives(this.spawnedKnives)

    this.knife.throw()
  }
  hitApple(apple) {
    this.gameManager.score += 1
    this.appleCounter.updateLabel()
    apple.hit()
  }
  hitTarget(target) {
    if (this.knife.isHitted) return
    this.gameManager.hits += 1
    target.addKnife(this.knife.texture.key)
    target.hit()
    this.knife.destroy()
    this.knife = null
    this.spawnKnife()
  }
  hitKnife(knife) {
    this.knife.isHitted = true
    this.gameManager.isGameOver = true
    this.knife.destroy()
  }
}