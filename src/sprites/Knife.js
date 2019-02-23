import Collider from './Collider'
import Target from './Target'

export default class Knife extends Collider {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.depth = 0
    this.isFire = false
    this.isHitted = false

  }
  throw () {
    this.isFire = true
    this.soundManager.playSfx('throw_1');
    this.setVelocityY(-2000)
  }
  hit () {
    this.soundManager.play('knife_hit_1')
  }
}