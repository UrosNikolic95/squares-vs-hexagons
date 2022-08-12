const radiansInCircle = 2 * Math.PI;
const degreesInCircle = 360;
const degreesPerRadian = degreesInCircle / radiansInCircle;
const radiansPerDegree = radiansInCircle / degreesInCircle;

export const triangleSide = 30;
const triangleHeigth = (triangleSide * Math.sqrt(3)) / 2;

export const spacing = 2;
const diameter = triangleSide - spacing;

export interface IPoint {
  x: number;
  y: number;
}

export interface ILine {
  p1: IPoint;
  p2: IPoint;
}

export function calculateABC(line: ILine) {
  const { p1, p2 } = line;
  const A = p2.y - p1.y;
  const B = p1.x - p2.x;
  const C = A * p1.x - B * p1.y;
  return {
    A,
    B,
    C,
  };
}

export function lineIntersection(l1: ILine, l2: ILine) {
  const { A: A1, B: B1, C: C1 } = calculateABC(l1);
  const { A: A2, B: B2, C: C2 } = calculateABC(l2);
  const det = A1 * B2 - A2 * B1;
  if (det == 0) {
    return null;
  }
  return {
    x: B1 * C2 - C1 * B2,
    y: A1 * C2 - A2 * C1,
  };
}

export function calculatePoints(shift = 0, modul = 2) {
  return Array.from({ length: 12 }, (value, index) => {
    const diameterPrim =
      (index + shift) % modul == 0 ? diameter : triangleHeigth - spacing;
    const degrees = index * 30 + 30;
    const radians = degrees * radiansPerDegree;
    const x = diameterPrim * Math.cos(radians) + triangleHeigth + spacing;
    const y = diameterPrim * Math.sin(radians) + diameter;
    return x.toFixed(2) + ',' + y.toFixed(2);
  }).join(' ');
}

export const squareWigth = 2 * triangleHeigth;
export const squareHeigth = 2 * triangleSide;

export function generateFIeld(a: number, b = a) {
  return Array.from({ length: a }, (_, indexA) =>
    Array.from({ length: b }, (_, indexB) => ({
      x: indexA,
      y: indexB,
    }))
  ).flat(2);
}
