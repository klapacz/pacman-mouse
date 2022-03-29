import { getNewLocation, random } from "./helpers";
import { walls } from "./data";
import { Cat } from "./types";

export default class Game {
  cats: Cat[] = [];
  ctx: CanvasRenderingContext2D;
  walls = walls;
  width = 10;
  height = 10;
  tileSize = 40;

  constructor() {
    const canvas = document.createElement("canvas");
    canvas.width = this.width * this.tileSize;
    canvas.height = this.height * this.tileSize;

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
    x >= this.width ||
    y >= this.height ||
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
    this.ctx.fillRect(
      0,
      0,
      this.width * this.tileSize,
      this.height * this.tileSize
    );

    // draw walls
    for (const [y, row] of walls.entries()) {
      for (const [x, block] of row.entries()) {
        if (block) {
          this.ctx.fillStyle = "#fff";
          this.ctx.fillRect(
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize
          );
        }
      }
    }

    for (const { x, y } of this.cats) {
      this.ctx.fillStyle = "#CD5700";
      this.ctx.fillRect(
        x * this.tileSize,
        y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    }
  };

  generateCats = () => {
    let end = 4;
    for (let i = 0; i < end; i++) {
      const x = random(0, this.width);
      const y = random(0, this.height);

      if (this.isColliding(x, y)) {
        end++;
        continue;
      }

      this.cats.push({ x, y });
    }
  };
}
