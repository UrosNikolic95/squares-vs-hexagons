const radiansInCircle = 2 * Math.PI;
const degreesInCircle = 360;
const degreesPerRadian = degreesInCircle / radiansInCircle;
const radiansPerDegree = radiansInCircle / degreesInCircle;

const triangleSide = 30;
const triangleHeigth = (triangleSide * Math.sqrt(3)) / 2;

const spacing = 2;
const diameter = triangleSide - spacing;
const points = Array.from({ length: 6 }, (value, index) => {
  const degrees = index * 60 + 30;
  const radians = degrees * radiansPerDegree;
  const x = diameter * Math.cos(radians) + triangleHeigth;
  const y = diameter * Math.sin(radians) + diameter;
  return x.toFixed(2) + ',' + y.toFixed(2);
}).join(' ');

const squareWigth = 2 * triangleHeigth;
const squareHeigth = 2 * triangleSide;
