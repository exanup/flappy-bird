import EntityHitBox from "./EntityHitBox.js";
import Sprite from "./Sprite.js";

export default class Bird {
  constructor(props) {
    this.parent = props.parent || null;

    this.width = props.width || 0;
    this.height = props.height || 0;
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.dx = props.dx || 0;
    this.dy = props.dy || 0;
    this.ddy = props.ddy || 0.7; // this is change in dy, ie. vertical acceleration

    this.state = Bird.states.FLYING_DOWN;

    this.sprite = new Sprite({
      src: "./assets/bird.png",
      width: 34,
      height: 24,
      isLoaded: false,
      currentFrame: 0,
      totalFrames: 4,
      frameDelay: 40,
    });

    this.hitBox = new EntityHitBox({
      parent: this,
    });
  }

  draw(ctx) {
    if (this.sprite.isLoaded) {
      // console.log("we are inside");
      var angleRads = Math.atan2(this.dy, 5);

      ctx.save();
      ctx.translate(this.x + 0.5 * this.width, this.y + 0.5 * this.height);
      ctx.rotate(angleRads);
      ctx.drawImage(this.sprite.$el,
        this.sprite.x, this.sprite.y,
        this.sprite.width, this.sprite.height, -0.5 * this.width, -0.5 * this.height,
        this.width, this.height
      );
      ctx.restore();
    }
    this.hitBox.show(ctx);
  }

  update() {
    this.move();
    this.sprite.update();
  }

  move() {
    // need to remove these boundary checks
    if (this.dy <= Bird.dyMAX && this.dy >= Bird.dyMIN) {
      this.dy += this.ddy;
    }
    if (this.y + this.dy <= 564 && this.y + this.dy >= 0) {
      this.y += this.dy;
    }
  }

  flyUpwards() {
    if (this.state === Bird.states.FLYING_UP) {
      this.dy = -10;
      this.state = Bird.states.FLYING_DOWN;
    }
  }

  handleInputs() {
    if (this.parent.eventHandler.spacePressed) {
      this.parent.eventHandler.spacePressed = false;
      this.state = Bird.states.FLYING_UP;
      this.flyUpwards();
    }
  }
}

Bird.states = {
  FLYING_UP: 0,
  FLYING_DOWN: 1,
  FAINTED: 2,
};

Bird.dyMAX = 10;
Bird.dyMIN = -10;
