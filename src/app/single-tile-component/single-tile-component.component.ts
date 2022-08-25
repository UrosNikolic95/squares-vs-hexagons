import {
  animate,
  keyframes,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  calculatePoint2,
  calculatePoint3,
  diameter2,
  getPointFromDegrees,
  hexPoints,
  IPoint,
  pickRandomColour,
  reversePoint2,
  reversePoint3,
  squareHeigth,
  squareWigth,
  State,
  triangleSide,
} from '../helpers/tile.helper';

@Component({
  selector: 'app-single-tile-component',
  templateUrl: './single-tile-component.component.html',
  styleUrls: ['./single-tile-component.component.css'],
  animations: [
    trigger('shape', [
      transition('* => *', [
        animate(
          '0.5s',
          keyframes([
            style({
              'clip-path': '{{ p1 }}',
              top: '{{ y1 }}',
              left: '{{ x1 }}',
            }),
            style({
              'clip-path': '{{ p2 }}',
              top: '{{ y2 }}',
              left: '{{ x2 }}',
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class SingleTileComponentComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    this.hexLocations();
  }

  hexLocations() {
    const { x, y } = this.point;

    const shift = y % 2 == 0 ? 0 : squareWigth / 2;
    this.x = x * squareWigth + shift;
    this.y = (y * triangleSide * 3) / 2;
  }

  square1Locations() {
    const { x, y } = this.point;

    this.x = x * squareWigth;
    this.y = y * squareWigth;
  }

  square2Locations() {
    const { x, y } = calculatePoint2(this.point);

    const translate1 = getPointFromDegrees(diameter2 * 2, 60);
    const translate2 = getPointFromDegrees(diameter2 * 2, -30);
    if (this.x != undefined && this.y != undefined) {
      this.x = translate1.x * y + translate2.x * x;
      this.y = translate1.y * y + translate2.y * x;
    }
  }

  square3Locations() {
    const { x, y } = calculatePoint3(this.point);

    const translate1 = getPointFromDegrees(diameter2 * 2, 120);
    const translate2 = getPointFromDegrees(diameter2 * 2, 30);
    if (this.x != undefined && this.y != undefined) {
      this.x = translate1.x * y + translate2.x * x;
      this.y = translate1.y * y + translate2.y * x;
    }
  }

  @Input()
  point = { x: 0, y: 0 };

  @HostBinding('style.height.px')
  height = squareHeigth + 1000;
  @HostBinding('style.width.px')
  width = squareWigth + 1000;

  @HostBinding('style.left.px')
  x?: number;
  @HostBinding('style.top.px')
  y?: number;

  currentState = State.hex;

  @HostBinding('style.clip-path')
  clipPath = hexPoints[this.currentState];

  @HostBinding('@shape')
  shape = {
    value: 0,
    params: {
      p1: '',
      p2: hexPoints[this.currentState],
      x1: '',
      y1: '',
      x2: this.x + 'px',
      y2: this.y + 'px',
    },
  };

  @HostBinding('style.background-color')
  color = pickRandomColour();

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    this.moveLine(event.key);
    this.hexTransition(event.key);
    this.calculateLocation();

    this.shape = {
      value: Date.now(),
      params: {
        p1: this.shape.params.p2,
        p2: hexPoints[this.currentState],
        x1: this.shape.params.x2,
        y1: this.shape.params.y2,
        x2: this.x + 'px',
        y2: this.y + 'px',
      },
    };
    this.clipPath = this.shape.params.p2;

    this.setOpacity();
  }

  hexTransition(key: string) {
    if (key == '1' && this.currentState == State.hex) {
      this.currentState = State.square1;
      return;
    }
    if (key == '2' && this.currentState == State.hex) {
      this.currentState = State.square2;
      return;
    }
    if (key == '3' && this.currentState == State.hex) {
      this.currentState = State.square3;
      return;
    }
    if (this.currentState != State.hex && ['1', '2', '3'].includes(key)) {
      this.currentState = State.hex;
      return;
    }
  }

  calculateLocation() {
    switch (this.currentState) {
      case State.square1:
        return this.square1Locations();
      case State.square2:
        return this.square2Locations();
      case State.square3:
        return this.square3Locations();
      case State.hex:
        return this.hexLocations();
      default:
        return null;
    }
  }

  moveLine(key: string) {
    const point1 = this.calculatePoint(this.point);

    if (point1) {
      this.moveCoordinate(key, point1);
      const point2 = this.reversePoint(point1);
      if (point2) {
        this.point = point2;
      }
    }
  }

  moveCoordinate(key: string, point: IPoint) {
    if (key == 'y') {
      if (point.y == this.selectedPoint.y) {
        point.x++;
      }
    }
    if (key == 'h') {
      if (point.y == this.selectedPoint.y) {
        point.x--;
      }
    }
    if (key == 'g') {
      if (point.x == this.selectedPoint.x) {
        point.y--;
      }
    }
    if (key == 'j') {
      if (point.x == this.selectedPoint.x) {
        point.y++;
      }
    }
  }

  calculatePoint(point: IPoint): IPoint | null {
    switch (this.currentState) {
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

  reversePoint(point: IPoint): IPoint | null {
    switch (this.currentState) {
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

  setOpacity() {
    if (
      this.selectedPoint.x == this.point.x &&
      this.selectedPoint.y == this.point.y
    ) {
      this.opacity = 0.5;
    } else {
      this.opacity = 1;
    }
  }

  @HostBinding('style.opacity')
  opacity = 1;

  @Input()
  selectedPoint = {
    x: 0,
    y: 0,
  };
}
