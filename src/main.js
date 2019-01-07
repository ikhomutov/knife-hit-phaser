import Phaser from 'phaser'

import GameScene from './scenes/Game'
import BootScene from './scenes/Boot'

let gameOptions = {
  width: 750,
  height: 1334
}

window.onload = function() {
  new Phaser.Game({
    type: Phaser.AUTO,
    parent: 'phaser-app',
    width: gameOptions.width,
    height: gameOptions.height,
    scene: [BootScene, GameScene]
  });
  window.focus();
  resize();
  window.addEventListener("resize", resize, !1)
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