export default class Sprite {
  constructor(props) {
    this.src = props.src || "";
    this.width = props.width || 0;
    this.height = props.height || 0;
    this.isLoaded = props.isLoaded || false;
    this.currentFrame = props.currentFrame || 0;
    this.totalFrames = props.totalFrames || 1;
    this.frameDelay = props.frameDelay || 1000;
    this.lastFrameUpdated = undefined;

    this.$el = new Image();
    this.$el.addEventListener("load", handleSpriteLoad.bind(this), false);
    this.$el.src = this.src;

    function handleSpriteLoad() {
      this.isLoaded = true;
      // console.log("'this' in current context is ", this);
    }
  }

  get x() {
    return 0;
  }

  get y() {
    return this.currentFrame * this.height;
  }

  update() {
    const now = Date.now();
    if (this.lastFrameUpdated === undefined ||
      now - this.lastFrameUpdated > this.frameDelay) {
      this.currentFrame++;
      if (this.currentFrame >= this.totalFrames) {
        this.currentFrame = 0;
      }
      this.lastFrameUpdated = now;
    }
  }

}
