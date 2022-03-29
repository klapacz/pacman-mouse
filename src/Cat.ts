import type Game from "./Game";
import { getNewLocation, random } from "./helpers";
import { Entity, Point } from "./types";

export default class Cat implements Point, Entity {
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
