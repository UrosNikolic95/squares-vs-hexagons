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
  calculatePoints,
  hexagon,
  hexPoints,
  IPoint,
  pointsToClipPathPoligon,
  pointsToString,
  square1,
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
          '1s',
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
    this.locationUpdate();
  }

  locationUpdate() {
    const x = this.point.x;
    const y = this.point.y;

    if (this.shift % 2 == 0) {
      const shift = y % 2 == 0 ? 0 : squareWigth / 2;
      this.x = x * squareWigth + shift;
      this.y = (y * triangleSide * 3) / 2;
      this.height = squareHeigth + 1000;
      this.width = squareWigth + 1000;
    } else {
      const shift = x % 2 == 0 ? 0 : squareWigth / 2;
      this.y = y * squareWigth + shift;
      this.x = (x * triangleSide * 3) / 2;
      this.height = squareWigth + 1000;
      this.width = squareHeigth + 1000;
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

  shift = 0;
  modul = 2;

  @HostBinding('style.clip-path')
  clipPath = pointsToClipPathPoligon(calculatePoints(this.shift));

  @HostBinding('@shape')
  shape = {
    value: 0,
    params: {
      p1: '',
      p2: pointsToClipPathPoligon(calculatePoints(this.shift)),
      x1: '',
      y1: '',
      x2: this.x + 'px',
      y2: this.y + 'px',
    },
  };

  currentState = State.hex;

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    this.hexTransition(event.key);

    console.log(this.currentState);

    this.locationUpdate();
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
    if (key == '1' && this.currentState == State.square1) {
      this.currentState = State.hex;
      return;
    }
    if (key == '2' && this.currentState == State.square2) {
      this.currentState = State.hex;
      return;
    }
    if (key == '3' && this.currentState == State.square3) {
      this.currentState = State.hex;
      return;
    }
  }
}
