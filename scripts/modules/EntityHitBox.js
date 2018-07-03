export default class EntityHitBox {
  constructor({
    parent = null,
    scale = 0.8,
  }) {

    if (parent === null) {
      throw Error("Need the parent to have a hitbox");
    }

    this.parent = parent;
    this.scale = scale;

    this.width = Math.round(this.scale * this.parent.width);
    this.height = Math.round(this.scale * this.parent.height);
  }

  get x() {
    return Math.round(this.parent.x + ((1 - this.scale) / 2) * this.parent.width);
  }

  get y() {
    return Math.round(this.parent.y + ((1 - this.scale) / 2) * this.parent.height);
  }

  show(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = "#F00";
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.closePath();
    ctx.restore();
    console.log(this.x, this.y, this.width, this.height);
  }
}
