import Phaser from 'phaser'

import GameManager from './classes/GameManager'
import SoundManager from './classes/SoundManager'
import BootScene from './scenes/Boot'
import TitleScene from './scenes/Title'
import ShopScene from './scenes/Shop'
import SettingsScene from './scenes/Settings'
import GameScene from './scenes/Game'

let game
let gameOptions = {
  width: 720,
  height: 1280,
  debug: true,
  debugLevel: 5,
  debugBoss: 7,
  unlockRandomCost: 100,
  unlockNowCost: 150,
}

window.onload = function() {
  game = new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-app',
    width: gameOptions.width,
    height: gameOptions.height,
    physics: {
      default: 'arcade',
      arcade: {
        debug: gameOptions.debug,
      }
    },
    scene: [
      BootScene,
      TitleScene,
      GameScene,
      ShopScene,
      SettingsScene
    ]
  });
  game.gameManager = new GameManager(game, gameOptions)
  game.soundManager = new SoundManager(game)
  window.focus();
  resize();
  window.addEventListener("resize", resize, false)
}

function resize(){
  let canvas = document.querySelector("canvas");
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let windowRatio = windowWidth / windowHeight;
  let gameRatio = gameOptions.width / gameOptions.height;
  if(windowRatio < gameRatio){
    canvas.style.width = windowWidth + "px";
    canvas.style.height = (windowWidth / gameRatio) + "px";
  }
  else{
    canvas.style.width = (windowHeight * gameRatio) + "px";
    canvas.style.height = windowHeight + "px";
  }
}