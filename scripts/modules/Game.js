import EventHandler from "./EventHandler.js";
import Bird from "./Bird.js";
import Pipe from "./Pipe.js";
import Background from "./Background.js";

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
    this.$canvas.style.backgroundColor = "#4ec0ca";
    this.$canvas.width = this.width;
    this.$canvas.height = this.height;
    this.$container.appendChild(this.$canvas);
    this.pipes = [];
    this.pipeScore = 0;
    this.lastPipeGeneratedAt = undefined;

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

    this.background = new Background({
      parent: this,
    });

    this.registerEventHandlers();
    this.animate();
  }

  animate() {
    setTimeout(this.animate.bind(this), 16);
    // setTimeout(this.animate.bind(this), 16);
    this.ctx.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
    this.draw(this.ctx);
    this.update();
    this.handleInputs();
  }

  draw(ctx) {
    this.background.drawSky(ctx);
    this.drawPipes(ctx);
    this.bird.draw(ctx);
    this.background.drawLand(ctx);
  }

  drawPipes(ctx) {
    this.pipes.forEach(pipe => {
      pipe.draw(ctx);
    });
  }

  update() {
    this.updatePipes();
    this.bird.update();
  }

  updatePipes() {
    // update all pipes
    this.pipes.forEach(pipe => {
      pipe.update();
    });
    // check for collision for pipe and set game over

    // check for oldest pipe going out of bound and remove it from queue

    // check if a new random pipe is needed to be generated
    if (this.lastPipeGeneratedAt === undefined ||
      (this.pipeScore - this.lastPipeGeneratedAt) >= this.pipeInterval) {
      this.lastPipeGeneratedAt = this.pipeScore;
      // generate new pipes
      // one at the top and another at the bottom
      // with the gap between them
      let rndY = this.getRandomY();
      let pipeUpper = new Pipe({
        parent: this,
        x: this.$canvas.width,
        y: rndY,
      });
      this.pipes.push(pipeUpper);

      let pipeLower = new Pipe({
        parent: this,
        isFlipped: true,
        x: this.$canvas.width,
        y: pipeUpper.y + Pipe.height + Pipe.gap,
      });
      this.pipes.push(pipeLower);
      // console.log("created 2 new pipes");
    }

    // increment lastPipe
    this.pipeScore++;
  }

  handleInputs() {
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

  getRandomY() {
    let availableHeight = this.$canvas.height - Background.land.height;
    let rnd = Math.random();
    let max = 0;
    let min = availableHeight - Pipe.gap - 2 * Pipe.height;

    let rndHeight = Math.round(rnd * (max - min) + min);
    return rndHeight;
  }

  get pipeInterval() {
    return Game.pipeInterval;
  }
}

Game.pipeInterval = 240 / Pipe.dx;
