import EventHandlerInstance from "./modules/EventHandler.js";
import Bird from "./modules/Bird.js";

let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d", {
  alpha: false // don't forget to make it false for better performance
});

let bird = new Bird({
  x: canvas.width / 3,
  y: canvas.width / 2,
  width: 51,
  height: 36,
});

animate();

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  bird.draw(ctx);
  bird.update();
  bird.handleInputs();
}

document.addEventListener("keydown", handleKeyDown, false);
document.addEventListener("keyup", handleKeyUp, false);

function handleKeyDown(e) {
  if (e.keyCode === 32) {
    EventHandlerInstance.spacePressed = true;
  }
}

function handleKeyUp(e) {
  if (e.keyCode === 32) {
    EventHandlerInstance.spacePressed = false;
  }
}

// console.log(bird);
