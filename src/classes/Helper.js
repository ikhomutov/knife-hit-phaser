export default class Helper {
  constructor() {}

  playSfx(ctx, key, vol) {
    if (!ctx.sys.game.sound_on) return;

    let data = {
      volume: vol || 1
    };

    return ctx.sound.play(key, data);
  }
}
