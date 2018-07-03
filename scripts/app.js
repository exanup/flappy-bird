import EntityHitBox from "./modules/EntityHitBox.js";

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d", {
  alpha: false // don't forget to make it false for better performance
});

let box = {
  x: 10,
  y: 10,
  height: 200,
  width: 200,
};

box.hitBox = new EntityHitBox({
  parent: box,
});

box.hitBox.show(ctx);
