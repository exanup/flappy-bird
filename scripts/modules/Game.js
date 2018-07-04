import EventHandler from "./EventHandler.js";
import Bird from "./Bird.js";

export default class Game {
  constructor(props) {
    if (typeof props.$container === "undefined") {
      throw Error("Game needs a container!");
    }

    this.$container = props.$container;
    this.width = props.width || 450;
    this.height = props.height || 600;

    this.$canvas = document.createElement("canvas");
    this.$canvas.className = "game-canvas";
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
    this.$container.appendChild(this.$canvas);

    this.ctx = this.$canvas.getContext("2d", {
      alpha: true,
    });

    this.eventHandler = new EventHandler();

    this.bird = new Bird({
      parent: this,
      x: this.$canvas.width / 3,
      y: this.$canvas.width / 2,
      width: 51,
      height: 36,
    });

    this.registerEventHandlers();
    this.animate();
  }
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // setTimeout(this.animate.bind(this), 16);
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.bird.draw(this.ctx);
    this.bird.update();
    this.bird.handleInputs();
  }

  registerEventHandlers() {
    document.addEventListener("keydown", this.handleKeyDown.bind(this), false);
    document.addEventListener("keyup", this.handleKeyUp.bind(this), false);
  }

  handleKeyDown(e) {
    if (e.keyCode === 32) {
      this.eventHandler.spacePressed = true;
    }
  }

  handleKeyUp(e) {
    if (e.keyCode === 32) {
      this.eventHandler.spacePressed = false;
    }
  }

}
