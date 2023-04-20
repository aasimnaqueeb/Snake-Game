// Get the canvas element
var canvas = document.getElementById("canvas");

// Set up the canvas context
var ctx = canvas.getContext("2d");

// Set up the game variables
var snake = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 }
];
var direction = "right";
var food = { x: 5, y: 5 };
var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var score = 0;

// Declare the game over message element
var gameOverMsg = document.createElement("div");
gameOverMsg.className = "game-over-message";

// Set up the game loop
function gameLoop() {
    // Clear the canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  
    // Update the snake position
    var head = { x: snake[0].x, y: snake[0].y };
    switch (direction) {
      case "up":
        head.y--;
        break;
      case "down":
        head.y++;
        break;
      case "left":
        head.x--;
        break;
      case "right":
        head.x++;
        break;
    }
  
    // Check for collision with the canvas border
    if (head.x < 0) {
      head.x = canvasWidth / 10 - 1;
    } else if (head.x > canvasWidth / 10 - 1) {
      head.x = 0;
    } else if (head.y < 0) {
      head.y = canvasHeight / 10 - 1;
    } else if (head.y > canvasHeight / 10 - 1) {
      head.y = 0;
    }
  
    snake.unshift(head);
  
    // Check for collisions with the body
    var collidedWithBody = false;
    for (var i = 1; i < snake.length; i++) {
      if (head.x === snake[i].x && head.y === snake[i].y) {
        collidedWithBody = true;
        break;
      }
    }
  
    if (collidedWithBody) {
        // The snake collided with its own body
        gameOverMsg.innerText = "Game Over!";
    
        // Add restart button to the game over message
        var restartBtn = document.createElement("button");
        restartBtn.innerText = "Restart";
        restartBtn.className = "restart-button";
        restartBtn.addEventListener("click", function() {
          // Reload the page to restart the game
          location.reload();
        });
        gameOverMsg.appendChild(restartBtn);

        document.body.appendChild(gameOverMsg);
    
        // Hide the play area and score board
        playArea.style.display = "none";
        scoreBoard.style.display = "none";
    
        return;
      }
  
    // Check for collisions with the food
    if (head.x === food.x && head.y === food.y) {
      // The snake has eaten the food
      food.x = Math.floor(Math.random() * canvasWidth / 10);
      food.y = Math.floor(Math.random() * canvasHeight / 10);
      score += 10; //Increment the score
    } else {
      // Remove the tail segment
      snake.pop();
    }
  
    // Draw the snake
    ctx.fillStyle = "green";
    snake.forEach(function(segment) {
      ctx.fillRect(segment.x * 10, segment.y * 10, 10, 10);
    });
  
    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 10, food.y * 10, 10, 10);
  
    // Set up the next iteration of the game loop
    setTimeout(gameLoop, 100);

    document.getElementById("score-board").textContent = "Score: " + score;
}
  
  
// Set up the keyboard controls
document.addEventListener("keydown", function(event) {
  switch (event.keyCode) {
    case 38:
      if (direction !== "down") {
        direction = "up";
      }
      break;
    case 40:
      if (direction !== "up") {
        direction = "down";
      }
      break;
    case 37:
      if (direction !== "right") {
        direction = "left";
      }
      break;
    case 39:
      if (direction !== "left") {
        direction = "right";
      }
      break;
  }

});

var startX, startY, endX, endY;

document.addEventListener("touchstart", function(event) {
  startX = event.touches[0].pageX;
  startY = event.touches[0].pageY;
});

document.addEventListener("touchmove", function(event) {
  endX = event.touches[0].pageX;
  endY = event.touches[0].pageY;
  if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
    if (startX > endX && direction !== "right") {
      direction = "left";
    } else if (startX < endX && direction !== "left") {
      direction = "right";
    }
  } else {
    if (startY > endY && direction !== "down") {
      direction = "up";
    } else if (startY < endY && direction !== "up") {
      direction = "down";
    }
  }
});


// Start the game loop
gameLoop();


