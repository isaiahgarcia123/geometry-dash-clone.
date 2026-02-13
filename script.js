const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let player = {
  x: 100,
  y: canvas.height - 150,
  size: 40,
  dy: 0,
  gravity: 0.8,
  jumpPower: -15,
  grounded: true
};

let obstacles = [];
let speed = 6;
let frame = 0;
let gameOver = false;

// Controls
document.addEventListener("keydown", () => {
  if (player.grounded && !gameOver) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
});

document.addEventListener("click", () => {
  if (player.grounded && !gameOver) {
    player.dy = player.jumpPower;
    player.grounded = false;
  }
});

function spawnObstacle() {
  obstacles.push({
    x: canvas.width,
    y: canvas.height - 100,
    width: 40,
    height: 60
  });
}

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Ground
  ctx.fillStyle = "#0f0";
  ctx.fillRect(0, canvas.height - 100, canvas.width, 100);

  // Player physics
  player.dy += player.gravity;
  player.y += player.dy;

  if (player.y >= canvas.height - 140) {
    player.y = canvas.height - 140;
    player.dy = 0;
    player.grounded = true;
  }

  // Draw player
  ctx.fillStyle = "#00f";
  ctx.fillRect(player.x, player.y, player.size, player.size);

  // Obstacles
  ctx.fillStyle = "#f00";
  obstacles.forEach((obs, index) => {
    obs.x -= speed;
    ctx.fillRect(obs.x, obs.y, obs.width, obs.height);

    // Collision
    if (
      player.x < obs.x + obs.width &&
      player.x + player.size > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.size > obs.y
    ) {
      gameOver = true;
      alert("Game Over! Refresh to restart.");
    }

    if (obs.x + obs.width < 0) {
      obstacles.splice(index, 1);
    }
  });

  if (frame % 90 === 0) {
    spawnObstacle();
  }

  frame++;
  requestAnimationFrame(update);
}

update();
