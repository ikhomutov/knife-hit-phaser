import Phaser from 'phaser'

import Helper from '../classes/Helper'
import Knife from '../sprites/Knife'
import Target from '../sprites/Target'
import Apple from '../sprites/Apple'


export default class PlayScene extends Phaser.Scene {
  constructor () {
    super({key: 'PlayScene'})
  }

  init() {
    this.helper = new Helper()
  }
  preload () {

  }
  create () {
    localStorage.getItem("userLevel") && (gameOptions.totalApples = parseInt(localStorage.getItem("userLevel")));
    gameOptions.isFirstLoad && (gameOptions.isFirstLoad = !1);
    this.currentRotationSpeed = gameOptions.rotationSpeed;
    this.newRotationSpeed = gameOptions.rotationSpeed;
    gameOptions.remainApples = gameOptions.totalApples;
    this.canThrow = true;
    this.knifeGroup = this.add.group();
    this.knife = new Knife(game.config.width / 2, game.config.height / 5 * 4, "knife01", this)
    this.stage = gameOptions.totalApples === gameOptions.limitStage ? this.add.bitmapText(game.config.width / 3.5, 50, "desyrel", "Final Stage", 64) : gameOptions.totalApples === gameOptions.limitStage / 2 ? this.add.bitmapText(game.config.width / 3.5, 50, "desyrel", "Semi Stage", 64) : this.add.bitmapText(game.config.width / 2.7, 50, "desyrel", "Stage" + gameOptions.totalApples, 64);
    this.remainKnife = this.add.bitmapText(game.config.width / 1.6, game.config.height / 5 * 4, "desyrel", "x" + gameOptions.remainKnife, 64);
    this.target = new Target(game.config.width / 2, 400, "target", this)
    this.apple = [];
    for (let i = 0; i < gameOptions.totalApples; i++) {
      this.apple[i] = new Apple(this, Phaser.Math.Between(0, 360))
    }
    this.input.on("pointerdown", this.throwKnife, this);
    if (gameOptions.totalApples === gameOptions.limitStage || gameOptions.totalApples === gameOptions.limitStage / 2) {
      this.time.addEvent({
        delay: gameOptions.changeTime,
        callback: this.changeSpeed,
        callbackScope: this,
        loop: !0
      })
    }

  }
  changeSpeed () {
    let a = Phaser.Math.Between(0, 1) ? -1 : 1
    let b = Phaser.Math.FloatBetween(-gameOptions.rotationVariation, gameOptions.rotationVariation)
    this.newRotationSpeed = (this.currentRotationSpeed + b) * a;
    this.newRotationSpeed = Phaser.Math.Clamp(this.newRotationSpeed, -gameOptions.maxRotationSpeed, gameOptions.maxRotationSpeed)
  }
  updateScene () {
    for (let a = 0; a < gameOptions.totalApples; a++)
      this.apple[a].destroy();
    for (let a = 0; a < this.knifeGroup.getChildren().length; a++)
      this.knifeGroup.getChildren()[a].destroy()
  }
  updateRemainKnife () {
    gameOptions.remainKnife--;
    this.remainKnife.text = "x" + gameOptions.remainKnife;
    0 >= gameOptions.remainKnife && 0 < gameOptions.remainApples && (this.canThrow = !1,
      this.resetGame())
  }
  resetGame () {
    let a = this.scene;
    this.stage.text = "You close :(";
    this.stage.x = this.target.x / 2;
    this.stage.depth = 2;
    this.tweens.add({
      targets: this.stage,
      y: 1.7 * this.target.y,
      duration: 2000,
      ease: "Bounce.easeOut",
      onComplete: function(b) {
        gameOptions.remainKnife = 8;
        gameOptions.totalApples = 1;
        a.start("PlayGame")
      }
    })
  }
  throwKnife () {
    if (this.canThrow && gameOptions.remainKnife >= 0) {
      this.canThrow = false
      this.helper.playSfx(this, 'throw_knife')
      this.tweens.add({
        targets: [this.knife],
        y: this.target.y + this.target.width / 2,
        duration: gameOptions.throwSpeed,
        callbackScope: this,
        onComplete: function (a) {
          this.canThrow = true;
          a = this.add.sprite(this.knife.x, this.knife.y, "knife");
          for (var b = !0, c = this.knifeGroup.getChildren(), d = 0; d < c.length; d++)
            if (Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, c[d].impactAngle)) < gameOptions.minAngle) {
              console.log("this is not a legal hit!!!");
              b = !1;
              break
            }
          if (b) {
            console.log("this is a legal hit.");
            for (d = 0; d < gameOptions.totalApples; d++)
              Math.abs(Phaser.Math.Angle.ShortestBetween(this.target.angle, 180 - this.apple[d].startAngle)) < gameOptions.minAngle && !this.apple[d].hit && (console.log("you're hit the apple!"),
                this.apple[d].hit = !0,
                this.apple[d].setFrame(1),
                b = this.add.sprite(this.apple[d].x, this.apple[d].y, "apple", 2),
                b.angle = this.apple[d].angle,
                b.setOrigin(.5, 1),
                gameOptions.remainApples--,
              0 === gameOptions.remainApples && (this.canThrow = !1),
                this.tweens.add({
                  targets: [this.apple[d], b],
                  y: game.config.height + this.apple[d].height,
                  x: {
                    getEnd: function (a, b, c) {
                      return Phaser.Math.Between(0, game.config.width / 2) + game.config.width / 2 * (a.frame.name - 1)
                    }
                  },
                  angle: 45,
                  duration: 6 * gameOptions.throwSpeed,
                  callbackScope: this,
                  onComplete: function (a) {
                    if (0 === gameOptions.remainApples)
                      if (gameOptions.totalApples === gameOptions.limitStage) {
                        var b = this.stage
                          , c = this.tweens;
                        this.canThrow = !1;
                        b.fontSize = 45;
                        b.text = "      Congratulation!!! \n You have won this game :)";
                        b.x = this.target.x / 4;
                        this.stage.depth = 2;
                        c.add({
                          targets: b,
                          y: 1.7 * this.target.y,
                          duration: 2E3,
                          ease: "Bounce.easeOut",
                          onComplete: function (a) {
                            c.add({
                              targets: b,
                              scaleY: 1.5,
                              y: game.config.height / 2.5,
                              repeat: -1,
                              yoyo: !0,
                              duration: 2E3
                            })
                          }
                        });
                        localStorage.setItem("userLevel", 10)
                      } else
                        gameOptions.remainKnife = 8,
                          gameOptions.totalApples++,
                          this.scene.start("PlayGame")
                  }
                }));
            this.updateRemainKnife();
            a.impactAngle = this.target.angle;
            this.knifeGroup.add(a);
            this.tweens.add({
              targets: this.target,
              scaleY: .9,
              yoyo: !0,
              duration: 100
            })
          } else {
            this.tweens.add({
              targets: a,
              angle: 360,
              x: game.config.width,
              y: game.config.height,
              duration: 1000
            })
          }
          this.updateRemainKnife();
          this.knife.y = game.config.height / 5 * 4
        }
      })
    }
  }
  update (time, delta) {
    this.target.angle += this.currentRotationSpeed;
    this.updateKnives()
    this.updateApples()
    if (gameOptions.totalApples === gameOptions.limitStage || gameOptions.totalApples === gameOptions.limitStage / 2)
      this.currentRotationSpeed = Phaser.Math.Linear(this.currentRotationSpeed, this.newRotationSpeed, delta / 1000)
  }
  updateKnives(time, delta){
    for (let knifes = this.knifeGroup.getChildren(), d = 0; d < knifes.length; d++) {
      knifes[d].angle += this.currentRotationSpeed
      let e = Phaser.Math.DegToRad(knifes[d].angle + 90)
      knifes[d].x = this.target.x + this.target.width / 1.9 * Math.cos(e)
      knifes[d].y = this.target.y + this.target.width / 1.9 * Math.sin(e)
    }
  }
  updateApples(time, delta){
    for (let i = 0; i < gameOptions.totalApples; i++)
      if (!this.apple[i].hit) {
        this.apple[i].angle += this.currentRotationSpeed
        let e = Phaser.Math.DegToRad(this.apple[i].angle - 90)
        this.apple[i].x = this.target.x + this.target.width / 2.3 * Math.cos(e)
        this.apple[i].y = this.target.y + this.target.width / 2.3 * Math.sin(e)
      }

  }
}