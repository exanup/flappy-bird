import Bird from "./modules/Bird.js";

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d", {
  alpha: false // don't forget to make it false for better performance
});

let bird = new Bird({
  x: 10,
  y: 10,
  width: 34,
  height: 24,
});

let raf = undefined;
const animate = function() {
  raf = requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.draw(ctx);
  bird.update();
};
animate();

// console.log(bird);
