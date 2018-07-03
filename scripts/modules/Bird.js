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

    this.sprite = new Sprite({
      src: "../../assets/bird.png",
      width: 34,
      height: 24,
      isLoaded: false,
      currentFrame: 0,
      totalFrames: 4,
      frameDelay: 100,
    });

    this.hitBox = new EntityHitBox({
      parent: this,
    });
  }

  draw(ctx) {
    if (this.sprite.isLoaded) {
      // console.log("we are inside");
      ctx.drawImage(this.sprite.$el,
        this.sprite.x, this.sprite.y,
        this.sprite.width, this.sprite.height,
        this.x, this.y,
        this.width, this.height
      );
    }
    // this.hitBox.show(ctx);
  }

  update() {
    this.move();
    this.sprite.update();
  }

  move() {
    // this.x += this.dx; // the bird doesn't move sideways!
    this.y += this.dy;
  }
}
