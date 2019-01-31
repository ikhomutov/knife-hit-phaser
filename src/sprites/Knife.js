import Collider from './Collider'
import Target from './Target'

export default class Knife extends Collider {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.depth = 0
    this.isFire = false

  }
  throw () {
    this.isFire = true
    this.scene.sound.play('throw_1');
    this.setVelocityY(-2000)
  }
  hit () {
    this.scene.sound.play('knife_hit_1')
  }
}