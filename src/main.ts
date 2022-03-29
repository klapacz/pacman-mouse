import { getNewLocation, random } from "./helpers";
import "./style.css";
import { Cat } from "./types";

const [width, height] = [10, 10];
const tileSize = 40;

const walls = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 1, 1, 1, 1, 1, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

class Game {
  cats: Cat[] = [];
  ctx: CanvasRenderingContext2D;
  walls = walls;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.width = width * tileSize;
    canvas.height = height * tileSize;

    document.body.appendChild(canvas);
    this.ctx = canvas.getContext("2d")!;
  }

  start() {
    this.generateCats();
    setInterval(() => {
      this.update();
      this.draw();
    }, 500);
  }

  isColliding = (x: number, y: number) =>
    x < 0 ||
    y < 0 ||
    x >= width ||
    y >= height ||
    walls[y][x] ||
    this.cats.find((cat) => cat.x === x && cat.y === y);

  update = () => {
    for (const [i, cat] of this.cats.entries()) {
      while (true) {
        const { x, y } = getNewLocation(cat);
        if (!this.isColliding(x, y)) {
          this.cats[i] = { x, y };
          break;
        }
      }
    }
  };

  draw = () => {
    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(0, 0, width * tileSize, height * tileSize);

    // draw walls
    for (const [y, row] of walls.entries()) {
      for (const [x, block] of row.entries()) {
        if (block) {
          this.ctx.fillStyle = "#fff";
          this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        }
      }
    }

    for (const { x, y } of this.cats) {
      this.ctx.fillStyle = "#CD5700";
      this.ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
    }
  };

  generateCats = () => {
    let end = 4;
    for (let i = 0; i < end; i++) {
      const x = random(0, width);
      const y = random(0, height);

      if (this.isColliding(x, y)) {
        end++;
        continue;
      }

      this.cats.push({ x, y });
    }
  };
}

const game = new Game();
game.start();
