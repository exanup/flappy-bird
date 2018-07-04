export default class Background {
  constructor(props) {
    this.parent = props.parent;

    this.sky = {
      width: Background.sky.width,
      height: Background.sky.height,
      $sprite: Background.sky.$sprite,
    };

    this.land = {
      width: Background.land.width,
      height: Background.land.height,
      $sprite: Background.land.$sprite,
    };
  }


  drawSky(ctx) {
    let y = this.parent.$canvas.height - this.land.height - this.sky.height;
    for (let i = 0; i < Math.ceil(this.parent.$canvas.width / this.sky.width); i++) {
      let x = i * this.sky.width;
      ctx.drawImage(this.sky.$sprite, x, y);
    }
  }

  drawLand(ctx) {
    let y = this.parent.$canvas.height - this.land.height;
    for (let i = 0; i < Math.ceil(this.parent.$canvas.width / this.land.width); i++) {
      let x = i * this.land.width;
      ctx.drawImage(this.land.$sprite, x, y);
    }
  }

  get hasSpriteLoaded() {
    return Background.sky.hasSpriteLoaded && Background.land.hasSpriteLoaded;
  }
}

Background.sky = {
  width: 276,
  height: 109,
};

Background.land = {
  width: 336,
  height: 112,
};

Background.land.dx = 1.7;

Background.sky.$sprite = new Image();
Background.sky.$sprite.addEventListener("load", () => {
  Background.sky.hasSpriteLoaded = true;
}, false);
Background.sky.$sprite.src = "./assets/sky.png";

Background.land.$sprite = new Image();
Background.land.$sprite.addEventListener("load", () => {
  Background.land.hasSpriteLoaded = true;
}, false);
Background.land.$sprite.src = "./assets/land.png";
