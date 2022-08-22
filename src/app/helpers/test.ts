import {
  calculateX1,
  calculateX2,
  calculateY1,
  calculateY2,
  IPoint,
  reverseX2,
  reverseY2,
} from './tile.helper';

function reverseY1(x: number, y: number) {
  return y - (x - (x % 2)) / 2;
}

function reverseX1(x: number, y: number) {
  const yp = reverseY1(x, y);
  return x + (yp - (yp % 2)) / 2;
}

export function test1(x: number, y: number) {
  const xp1 = calculateX1(x, y);
  const yp1 = calculateY1(x, y);
  const xp2 = reverseX1(xp1, yp1);
  const yp2 = reverseY1(xp1, yp1);
  return {
    x: xp2,
    y: yp2,
  };
}

export function test2(x: number, y: number) {
  const xp1 = calculateX2(x, y);
  const yp1 = calculateY2(x, y);
  const xp2 = reverseX2(xp1, yp1);
  const yp2 = reverseY2(xp1, yp1);
  return {
    x: xp2,
    y: yp2,
  };
}

function getRandom() {
  return Math.floor(Math.random() * 100);
}

export function test2b(x: number, y: number) {
  const { x: xp, y: yp } = test2(x, y);
  const res = x == xp && y == yp;
  if (!res) console.log(x, xp, y, yp);
  return x == xp && y == yp;
}

export function arrayTest2() {
  return Array.from({ length: 1000 }, (item) =>
    test2b(getRandom(), getRandom())
  ).every((el) => el);
}
