import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor () {
    super({key: 'BootScene'})
  }

  init() {

  }
  preload () {
    let width = this.cameras.main.width
    let height = this.cameras.main.height
    let barLine = this.add.graphics()
    barLine.x = this.cameras.main.x
    barLine.y = height / 3.3;
    let barBg = this.add.graphics()
    barBg.fillStyle(2236962, .8)
    barBg.fillRect(240, 270, 320, 50)
    barBg.x = this.cameras.main.x
    barBg.y = height / 3.3
    let loadingText = this.make.text({
      x: width / 1.85,
      y: height / 2.2,
      text: "Loading...",
      style: {
        font: "40px arial",
        fill: "#ffffff"
      }
    })
    loadingText.setOrigin(.5, .5);
    var progressText = this.make.text({
      x: width / 1.9,
      y: height / 1.9,
      text: "0%",
      style: {
        font: "28px arial",
        fill: "#ffffff"
      }
    })
    progressText.setOrigin(.5, .5)
    this.load.on("progress", function(value) {
      progressText.setText(parseInt(100 * value) + "%");
      barLine.clear();
      barLine.fillStyle(8816262, 1);
      barLine.fillRect(250, 280, 300 * value, 30)
    })
    this.load.on("complete", function() {
      barLine.destroy()
      barBg.destroy()
      loadingText.destroy()
      progressText.destroy()
    })

    for (let i = 1; i < 7; i++) {
      this.load.image("boss_" + i, "assets/images/enemies/boss_" + i + ".png")
    }
    this.load.image("enemy_1", "assets/images/enemies/enemy_1.png")
    this.load.image("enemy_2", "assets/images/enemies/enemy_2.png")

    for (let i = 1; i < 21; i++) {
      this.load.image("knife_" + i, "assets/images/knives/knife_" + i + ".png")
    }
    this.load.image('knife', 'assets/images/Knife.png')
    this.load.image("apple_full", "assets/images/apple-full.png")
    this.load.image("apple_half", "assets/images/apple-half.png")
    this.load.image("knife_white", "assets/images/play_knife_white_01.png")
    this.load.image("knife_blue", "assets/images/play_knife_blue_01.png")

    this.load.image("title_bg", "assets/images/title_bg.png")
    this.load.atlas('title_logo', 'assets/images/title_logo.png', 'assets/images/title_logo.json');
    this.load.image("game_bg", "assets/images/game_bg.png")

    this.load.image('play_btn', 'assets/images/buttons/play.png')
    this.load.image('settings_btn', 'assets/images/buttons/settings.png')
    this.load.image('shop_btn', 'assets/images/buttons/shop.png')
    this.load.image('back_btn', 'assets/images/buttons/back.png')
    this.load.image('on_btn', 'assets/images/buttons/on.png')
    this.load.image('off_btn', 'assets/images/buttons/off.png')

    this.load.image('shop_title', 'assets/images/shop_title.png')
    this.load.image('shop_counter', 'assets/images/shop_counter.png')
    this.load.image('shop_item_bg', 'assets/images/shop_item_bg.png')
    this.load.image('unlock_random_btn', 'assets/images/buttons/unlock_random.png')
    this.load.image('unlock_now_btn', 'assets/images/buttons/unlock_now.png')

    this.load.image('settings_title', 'assets/images/settings_title.png')

    this.load.audio("throw_1", "assets/audio/ev_throw_1.mp3")
    this.load.audio("hit_1", "assets/audio/ev_hit_1.mp3")
    this.load.audio("apple_hit_1", "assets/audio/ev_apple_hit_1.mp3")
    this.load.audio("knife_hit_1", "assets/audio/ev_knife_hit_1.mp3")
    this.load.audio('shop_select_item', 'assets/audio/ev_shop_select_item.mp3')
    this.load.audio('shop_select_locked_item', 'assets/audio/ev_shop_select_locked_item.mp3')
    this.load.audio('shop_unlock', 'assets/audio/ev_shop_unlock.mp3')

    this.load.json('levels', 'assets/levels.json')
  }
  create () {
    this.scene.start('TitleScene')

  }

}