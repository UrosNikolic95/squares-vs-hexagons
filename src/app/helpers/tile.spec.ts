import { arrayTest2, test1, test2 } from './test';

describe('helper-test', () => {
  it('test-reverse-functionsx-x-1', () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const point = test1(x, y);
    console.log(x, point.x);
    expect(point.x).toBe(x);
  });

  it('test-reverse-functions-y-1', () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const point = test1(x, y);
    console.log(y, point.y);
    expect(point.y).toBe(y);
  });

  it('test-reverse-functions-x-2', () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const point = test2(x, y);
    console.log(x, point.x);
    expect(point.x).toBe(x);
  });

  it('test-reverse-functions-y-2', () => {
    const x = Math.floor(Math.random() * 100);
    const y = Math.floor(Math.random() * 100);
    const point = test2(x, y);
    console.log(y, point.y);
    expect(point.y).toBe(y);
  });

  it('test-reverse-functions-array-2', () => {
    expect(arrayTest2()).toBe(true);
  });
});
