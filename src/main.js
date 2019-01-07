import Phaser from 'phaser'

import GameManager from './classes/GameManager'
import GameScene from './scenes/Game'
import BootScene from './scenes/Boot'

let game
let gameOptions = {
  width: 750,
  height: 1334,
  startRotationSpeed: 2,
  maxRotationSpeed: 5
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
        debug: false
      }
    },
    scene: [BootScene, GameScene]
  });
  game.gameManager = new GameManager(game, gameOptions)
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