import Collider from './Collider'
import Target from './Target'

export default class Knife extends Collider {
  constructor(scene, x, y, key) {
    super(scene, x, y, key)
    this.depth = 0
  }
  throw () {
    this.scene.sound.play('throw_1');
    this.setVelocityY(-2000)
  }
  hit () {
    this.scene.sound.play('knife_hit_1')
  }
}