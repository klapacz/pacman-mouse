import "./style.css";

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

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

type Cat = {
  x: number;
  y: number;
};

const cats: Cat[] = [];

const isColliding = (x: number, y: number) =>
  walls[y][x] || cats.find((cat) => cat.x === x && cat.y === y);

const generateCats = () => {
  let end = 4;
  for (let i = 0; i < end; i++) {
    const x = random(0, width);
    const y = random(0, height);

    if (isColliding(x, y)) {
      end++;
      continue;
    }

    cats.push({ x, y });
  }
};

const random = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

const draw = (ctx: CanvasRenderingContext2D) => {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, width * tileSize, height * tileSize);

  // draw walls
  for (const [y, row] of walls.entries()) {
    for (const [x, block] of row.entries()) {
      if (block) {
        ctx.fillStyle = "#fff";
        ctx.fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
      }
    }
  }
};

canvas.width = width * tileSize;
canvas.height = height * tileSize;

document.body.appendChild(canvas);

if (ctx) {
  generateCats();
  console.log(cats);
  // draw(ctx);
  setInterval(() => draw(ctx), 500);
}
