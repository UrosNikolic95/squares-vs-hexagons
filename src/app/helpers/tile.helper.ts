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
  const C = A * p1.x + B * p1.y;
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
    x: (B2 * C1 - C2 * B1) / det,
    y: (A1 * C2 - A2 * C1) / det,
  };
}

function getPoint1(diameter: number, radians: number) {
  return {
    x: diameter * Math.cos(radians),
    y: diameter * Math.sin(radians),
  };
}

function getPoint2(index: number) {
  const degrees = index * 30 + 30;
  const radians = degrees * radiansPerDegree;
  const point = getPoint1(diameter, radians);
  return {
    x: point.x,
    y: point.y,
  };
}

function distanceFromBegining(point: IPoint) {
  return Math.sqrt(Math.pow(point.x, 2) + Math.pow(point.y, 2));
}

function getPoint3(index1: number, index2: number, div: number) {
  if (index2 % div == 0) return getPoint2(index1);
  const i1 = index1 - (index2 % div);
  const i2 = i1 + div;
  const p1 = getPoint2(i1);
  const p2 = getPoint2(i2);
  const r = getPoint2(index1);
  const z = { x: 0, y: 0 };
  return lineIntersection({ p1, p2 }, { p1: z, p2: r });
}

export function calculatePoints(shift = 0, modul = 2) {
  const points = Array.from({ length: 12 }, (value, index) => {
    const point = getPoint3(index, index + shift, modul);
    return point;
  }) as IPoint[];
  console.log(points[0]);
  const xVal = points.map((el) => el?.x).filter((el) => el);
  const maxX = Math.max(...xVal);
  const minX = Math.min(...xVal);
  const absDiffX = Math.abs(maxX - minX);

  const yVal = points.map((el) => el?.y).filter((el) => el);
  const maxY = Math.max(...yVal);
  const minY = Math.min(...yVal);
  const absDiffY = Math.abs(maxY - minY);

  points.forEach((el) => {
    el.x += absDiffX / 2 + spacing;
    el.y += absDiffY / 2 + spacing;
  });

  return points;
}

export function pointsToString(points: IPoint[]) {
  return points.map((el) => el.x.toFixed(2) + ',' + el.y.toFixed(2)).join(' ');
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
