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

function getPointFromRadians(diameter: number, radians: number) {
  return {
    x: diameter * Math.cos(radians),
    y: diameter * Math.sin(radians),
  };
}

export function getPointFromDegrees(diameter: number, degrees: number) {
  return {
    x: diameter * Math.cos(degrees * radiansPerDegree),
    y: diameter * Math.sin(degrees * radiansPerDegree),
  };
}

function getPoint2(index: number) {
  const degrees = index * 30 + 30;
  const radians = degrees * radiansPerDegree;
  const point = getPointFromRadians(diameter, radians);
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

function getAbsDiff(points: IPoint[], getter: (el: IPoint) => number) {
  const val = points.map(getter).filter((el) => el);
  const max = Math.max(...val);
  const min = Math.min(...val);
  return Math.abs(max - min);
}

function adjustPoints(points: IPoint[]) {
  const absDiffX = getAbsDiff(points, (el) => el.x);
  const absDiffY = getAbsDiff(points, (el) => el.y);

  points.forEach((el) => {
    el.x += absDiffX / 2 + spacing;
    el.y += absDiffY / 2 + spacing;
  });
  return points;
}

export function calculatePoints(shift = 0, modul = 2) {
  const points = Array.from({ length: 12 }, (value, index) => {
    const point = getPoint3(index, index + shift, modul);
    return point;
  }) as IPoint[];

  return adjustPoints(points);
}

export function pointsToString(points: IPoint[]) {
  return points.map((el) => el.x.toFixed(2) + ',' + el.y.toFixed(2)).join(' ');
}

export function pointsToClipPathPoligon(points: IPoint[]) {
  return `polygon(${points
    .map((el) => el.x.toFixed(2) + 'px ' + el.y.toFixed(2) + 'px')
    .join(',')})`;
}

export const squareWigth = 2 * triangleHeigth;
export const squareHeigth = 2 * triangleSide;

export function generateField(a: number, b = a) {
  return Array.from({ length: a }, (_, indexA) =>
    Array.from({ length: b }, (_, indexB) => ({
      x: indexA,
      y: indexB,
    }))
  ).flat(2);
}

export const hexDiameter = 30;
export const hexSmallerDiameter = (triangleSide * Math.sqrt(3)) / 2;

export const hexagon = adjustPoints(
  Array.from({ length: 6 }, (_, index) =>
    getPointFromDegrees(hexDiameter, 30 + index * 60)
  )
);

export const diameter1 = hexSmallerDiameter * Math.sqrt(2);
export const diameter2 = diameter1 / Math.sqrt(2);

export const hexDistance = (hexDiameter * Math.sqrt(3)) / 2;

export const square1 = adjustPoints([
  getPointFromDegrees(diameter1, 45 + 0 * 60),
  getPointFromDegrees(diameter2, 30 + 1 * 60),
  getPointFromDegrees(diameter1, 15 + 2 * 60),
  getPointFromDegrees(diameter1, 45 + 3 * 60),
  getPointFromDegrees(diameter2, 30 + 4 * 60),
  getPointFromDegrees(diameter1, 15 + 5 * 60),
]);

export const square2 = adjustPoints([
  getPointFromDegrees(diameter1, 15 + 0 * 60),
  getPointFromDegrees(diameter1, 45 + 1 * 60),
  getPointFromDegrees(diameter2, 30 + 2 * 60),
  getPointFromDegrees(diameter1, 15 + 3 * 60),
  getPointFromDegrees(diameter1, 45 + 4 * 60),
  getPointFromDegrees(diameter2, 30 + 5 * 60),
]);

export const square3 = adjustPoints([
  getPointFromDegrees(diameter2, 30 + 0 * 60),
  getPointFromDegrees(diameter1, 15 + 1 * 60),
  getPointFromDegrees(diameter1, 45 + 2 * 60),
  getPointFromDegrees(diameter2, 30 + 3 * 60),
  getPointFromDegrees(diameter1, 15 + 4 * 60),
  getPointFromDegrees(diameter1, 45 + 5 * 60),
]);

export enum State {
  hex,
  square1,
  square2,
  square3,
}

export const hexPoints = {
  [State.hex]: pointsToClipPathPoligon(hexagon),
  [State.square1]: pointsToClipPathPoligon(square1),
  [State.square2]: pointsToClipPathPoligon(square2),
  [State.square3]: pointsToClipPathPoligon(square3),
};

export function calcualteCategory1(x: number, y: number) {
  const q1 = ((y - (y % 2)) / 2 + x) % 2;
  return q1 == 0;
}

export function calcualteCategory2(x: number, y: number) {
  return calcualteCategory1(x, y + 1);
}

export function calculateX2(x: number, y: number) {
  return x - (y - (y % 2)) / 2;
}
export function calculateY2(x: number, y: number) {
  const xp = calculateX2(x, y);
  return y + (xp - (xp % 2)) / 2;
}

export function calculateX3(x: number, y: number) {
  const yp = y + 1;
  return x + (yp - (yp % 2)) / 2;
}

export function calculateY3(x: number, y: number) {
  const xp = calculateX3(x, y);
  return y - (xp - (xp % 2)) / 2;
}

const colors = ['blue', 'red', 'green'];

export function pickRandomColour() {
  return colors[Math.floor(Math.random() * 3)];
}

export function reverseY2(x: number, y: number) {
  return y - (x - (x % 2)) / 2;
}

export function reverseX2(x: number, y: number) {
  const yp = reverseY2(x, y);
  return x + (yp - (yp % 2)) / 2;
}

export function reverseY3(x: number, y: number) {
  return y + (x - (x % 2)) / 2;
}

export function reverseX3(x: number, y: number) {
  const yp = reverseY3(x, y) + 1;
  return x - (yp - (yp % 2)) / 2;
}

export function calculatePoint2(point: IPoint): IPoint {
  return {
    x: calculateX2(point.x, point.y),
    y: calculateY2(point.x, point.y),
  };
}

export function reversePoint2(point: IPoint): IPoint {
  return {
    x: reverseX2(point.x, point.y),
    y: reverseY2(point.x, point.y),
  };
}

export function calculatePoint3(point: IPoint): IPoint {
  return {
    x: calculateX3(point.x, point.y),
    y: calculateY3(point.x, point.y),
  };
}

export function reversePoint3(point: IPoint): IPoint {
  return {
    x: reverseX3(point.x, point.y),
    y: reverseY3(point.x, point.y),
  };
}

export function calculatePoint(point: IPoint, state: State): IPoint | null {
  switch (state) {
    case State.square1:
      return { ...point };
    case State.square2:
      return calculatePoint2(point);
    case State.square3:
      return calculatePoint3(point);
    default:
      return null;
  }
}

export function reversePoint(point: IPoint, state: State): IPoint | null {
  switch (state) {
    case State.square1:
      return { ...point };
    case State.square2:
      return reversePoint2(point);
    case State.square3:
      return reversePoint3(point);
    default:
      return null;
  }
}

export function hexTransition(key: string, currentState: State) {
  if (key == '1' && currentState == State.hex) {
    return State.square1;
  }
  if (key == '2' && currentState == State.hex) {
    return State.square2;
  }
  if (key == '3' && currentState == State.hex) {
    return State.square3;
  }
  if (currentState != State.hex && ['1', '2', '3'].includes(key)) {
    return State.hex;
  }
  return currentState;
}
