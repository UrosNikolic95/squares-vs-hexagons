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
  calcualteCategory1,
  calcualteCategory2,
  diameter1,
  diameter2,
  getPointFromDegrees,
  hexDistance,
  hexPoints,
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
    const x = this.point.x;
    const y = this.point.y;

    const shift = y % 2 == 0 ? 0 : squareWigth / 2;
    this.x = x * squareWigth + shift;
    this.y = (y * triangleSide * 3) / 2;
  }

  squareShift() {
    const x = this.point.x;
    const y = this.point.y;

    const shift = y % 2 == 0 ? 0 : squareWigth / 2;
    this.x = x * squareWigth + shift;
    this.y = (y * triangleSide * 3) / 2;
  }

  square1Locations() {
    this.color = 'black';

    const x = this.point.x;
    const y = this.point.y;

    this.x = x * squareWigth;
    this.y = y * squareWigth;
  }

  square2Locations() {
    const x = this.point.x;
    const y = this.point.y;

    this.hexLocations();
    if (calcualteCategory1(x, y)) {
      this.color = 'blue';
      const translate = getPointFromDegrees(hexDistance, 60);
      if (this.x != undefined && this.y != undefined) {
        this.x += translate.x || 0;
        this.y += translate.y || 0;
      }
    } else {
      this.color = 'black';
    }
  }

  square3Locations() {
    const x = this.point.x;
    const y = this.point.y;

    this.hexLocations();
    if (calcualteCategory2(x, y)) {
      this.color = 'blue';
      const translate = getPointFromDegrees(hexDistance, 120);
      if (this.x != undefined && this.y != undefined) {
        this.x += translate.x || 0;
        this.y += translate.y || 0;
      }
    } else {
      this.color = 'black';
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
  color = 'black';

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    this.hexTransition(event.key);

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
  }

  hexTransition(key: string) {
    if (key == '1' && this.currentState == State.hex) {
      this.currentState = State.square1;
      this.square1Locations();
      return;
    }
    if (key == '2' && this.currentState == State.hex) {
      this.currentState = State.square2;
      this.square2Locations();
      return;
    }
    if (key == '3' && this.currentState == State.hex) {
      this.currentState = State.square3;
      this.square3Locations();
      return;
    }
    if (this.currentState != State.hex) {
      this.currentState = State.hex;
      this.hexLocations();
      return;
    }
  }
}
