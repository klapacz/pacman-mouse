import { getNewLocation, random } from "./helpers";
import { walls } from "./data";
import { Point } from "./types";

class Cat implements Point {
  x: number;
  y: number;
  game: Game;

  constructor(game: Game) {
    this.game = game;
    this.x = random(0, this.game.width);
    this.y = random(0, this.game.height);
  }

  draw() {
    this.game.ctx.fillStyle = "#CD5700";
    this.game.ctx.fillRect(
      this.x * this.game.tileSize,
      this.y * this.game.tileSize,
      this.game.tileSize,
      this.game.tileSize
    );
  }

  update() {
    while (true) {
      const candidate = getNewLocation(this);
      if (!this.game.isColliding(candidate)) {
        this.x = candidate.x;
        this.y = candidate.y;
        break;
      }
    }
  }
}

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
    this.generate();
    setInterval(() => {
      this.update();
      this.draw();
    }, 500);
  }

  isColliding = (point: Point) =>
    point.x < 0 ||
    point.y < 0 ||
    point.x >= this.width ||
    point.y >= this.height ||
    walls[point.y][point.x] ||
    this.cats.find((cat) => cat.x === point.x && cat.y === point.y);

  update() {
    for (const cat of this.cats) {
      cat.update();
    }
  }

  draw() {
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

    // draw cats
    for (const cat of this.cats) {
      cat.draw();
    }
  }

  generate() {
    // generate cats
    let end = 4;
    for (let i = 0; i < end; i++) {
      const candidate = new Cat(this);

      if (this.isColliding(candidate)) {
        end++;
        continue;
      }

      this.cats.push(candidate);
    }
  }
}
