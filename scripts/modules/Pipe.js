import EntityHitBox from "./EntityHitBox.js";

export default class Pipe {
  constructor(props) {
    this.parent = props.parent || null;
    this.isFlipped = props.isFlipped || false;
    this.x = props.x || 0;
    this.y = props.y || 0;

    this.hitBox = new EntityHitBox({
      parent: this,
      scale: 1,
    });
  }

  get hasSpriteLoaded() {
    let loaded = true;
    for (let prop in Pipe) {
      if (prop === "upper" || prop === "lower") {
        loaded &= Pipe[prop].hasSpriteLoaded;
      }
    }
    return loaded;
  }

  get $sprite() {
    if (this.isFlipped) {
      return Pipe.lower.$sprite;
    } else {
      return Pipe.upper.$sprite;
    }
  }

  get width() {
    return Pipe.width;
  }

  get height() {
    return Pipe.height;
  }

  get dx() {
    return Pipe.dx;
  }

  draw(ctx) {
    if (this.hasSpriteLoaded) {
      // console.log("we are inside pipe draw");
      ctx.save();
      ctx.drawImage(
        this.$sprite,
        this.x, this.y
      );
      ctx.restore();
    }
    this.hitBox.show(ctx);
  }

  update() {
    this.move();
  }

  move() {
    this.x -= this.dx;
  }
}

Pipe.dx = 1.7;
Pipe.height = 320;
Pipe.width = 52;
Pipe.gap = 150;
Pipe.upper = {};
Pipe.lower = {};
Pipe.upper.hasSpriteLoaded = false;
Pipe.lower.hasSpriteLoaded = false;

Pipe.upper.$sprite = new Image();
Pipe.upper.$sprite.addEventListener("load", () => {
  handlePipeLoaded("upper");
}, false);
Pipe.upper.$sprite.src = "./assets/pipe-full-upper.png";

Pipe.lower.$sprite = new Image();
Pipe.lower.$sprite.addEventListener("load", () => {
  handlePipeLoaded("lower");
}, false);
Pipe.lower.$sprite.src = "./assets/pipe-full-lower.png";

function handlePipeLoaded(index) {
  Pipe[index].hasSpriteLoaded = true;
}
