import Phaser from 'phaser'

import Collider from './Collider'

export default class Apple extends Collider {
  constructor(scene, x, y) {
    let appleParticles = scene.add.particles('apple_half').setDepth(2)

    super(scene, x, y, 'apple_full')

    this.emitter = appleParticles.createEmitter({
      on: false,
      speed: 200,
      gravityY: 1000,
      lifespan: 2000,
    })

    this.setCircle(32);
    this.depth = 2
  }
  hit (knife) {
    this.scene.sound.play('apple_hit_1')
    this.emitter.emitParticle(2, this.x, this.y);
    this.destroy()

    this.gameManager.score += 1
  }
}