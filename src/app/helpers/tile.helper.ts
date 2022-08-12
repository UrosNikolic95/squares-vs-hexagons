const radiansInCircle = 2 * Math.PI;
const degreesInCircle = 360;
const degreesPerRadian = degreesInCircle / radiansInCircle;
const radiansPerDegree = radiansInCircle / degreesInCircle;

export const triangleSide = 30;
const triangleHeigth = (triangleSide * Math.sqrt(3)) / 2;

const spacing = 2;
const diameter = triangleSide - spacing;
export const points = Array.from({ length: 12 }, (value, index) => {
  const diameterPrim = index % 2 == 0 ? diameter : triangleHeigth - spacing;
  const degrees = index * 30 + 30;
  const radians = degrees * radiansPerDegree;
  const x = diameterPrim * Math.cos(radians) + triangleHeigth;
  const y = diameterPrim * Math.sin(radians) + diameter;
  return x.toFixed(2) + ',' + y.toFixed(2);
}).join(' ');

export const squareWigth = 2 * triangleHeigth;
export const squareHeigth = 2 * triangleSide;

export const heigth = 50;
export const wigth = 50;

export function generateFIeld(a: number, b = a) {
  return Array.from({ length: a }, (_, indexA) =>
    Array.from({ length: b }, (_, indexB) => ({
      x: indexA,
      y: indexB,
    }))
  ).flat(2);
}
