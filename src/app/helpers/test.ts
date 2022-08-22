import {
  calculateDiagonalRowCoordinateX1,
  calculateDiagonalRowCoordinateY1,
  IPoint,
} from './tile.helper';

function reverseY1(x: number, y: number) {
  return y - (x - (x % 2)) / 2;
}

function reverseX1(x: number, y: number) {
  const yp = reverseY1(x, y);
  return x + (yp - (yp % 2)) / 2;
}

function test(x: number, y: number) {
  const xp1 = calculateDiagonalRowCoordinateX1(x, y);
  const yp1 = calculateDiagonalRowCoordinateY1(x, y);
  const xp2 = reverseX1(xp1, yp1);
  const yp2 = reverseY1(xp1, yp1);
  return xp2 == x && yp2 == y;
}

console.log('Test: ', test(5, 8));
