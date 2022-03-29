import { Point } from "./types";

export const random = (min: number, max: number) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const getRandomArrayElement = <T>(arr: readonly T[]) =>
  arr[Math.floor(Math.random() * arr.length)];

export const getNewLocation = <T extends Point>(point: T) => {
  const direction = getRandomArrayElement(["x", "y"] as const);
  const location = getRandomArrayElement([-1, 1] as const);
  const clone = { ...point };
  clone[direction] += location;

  return clone;
};
