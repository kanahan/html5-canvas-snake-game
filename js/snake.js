
window.onload = function () {
  canv = document.getElementById("canv");
  ctx = canv.getContext("2d");
  document.addEventListener("keydown", keyPush);
  setInterval(game, 1000 / 10);
}

positionX = positionY = 0;
floorSize = 20;
squareSize = 20;
appleX = appleY = 15;
movestepX = moveStepY = 0;
trail = [];
tail = 5;

function game() {
  positionX += movestepX;
  positionY += moveStepY;

  if (positionX < 0) {
    positionX = floorSize - 1;
  }
  if (positionX > floorSize - 1) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = floorSize - 1;
  }
  if (positionY > floorSize - 1) {
    positionY = 0;
  }

  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canv.width, canv.height);

  ctx.fillStyle = "lime";
  for (var i = 0; i < trail.length; i++) {
    ctx.fillRect(trail[i].x * squareSize, trail[i].y * squareSize, squareSize - 2, squareSize - 2);

    if (trail[i].x == positionX && trail[i].y == positionY) {
      tail = 5;
    }
  }

  trail.push({ x: positionX, y: positionY });
  while (trail.length > tail) {
    trail.shift();
  }

  if (appleX == positionX && appleY == positionY) {
    tail++;
    appleX = Math.floor(Math.random() * floorSize);
    appleY = Math.floor(Math.random() * floorSize);
  }

  ctx.fillStyle = "red";
  ctx.fillRect(appleX * squareSize, appleY * squareSize, squareSize - 2, squareSize - 2);
}

function keyPush(evt) {
  switch (evt.keyCode) {
    case 37:
      movestepX = -1;
      moveStepY = 0;
      break;
    case 38:
      movestepX = 0;
      moveStepY = -1;
      break;
    case 39:
      movestepX = 1;
      moveStepY = 0;
      break;
    case 40:
      movestepX = 0;
      moveStepY = 1;
      break;
  }
}