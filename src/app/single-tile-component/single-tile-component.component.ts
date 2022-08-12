import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  calculatePoints,
  spacing,
  squareHeigth,
  squareWigth,
  triangleSide,
} from '../helpers/tile.helper';

@Component({
  selector: 'app-single-tile-component',
  templateUrl: './single-tile-component.component.html',
  styleUrls: ['./single-tile-component.component.css'],
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
      this.height = squareHeigth;
      this.width = squareWigth;
    } else {
      const shift = x % 2 == 0 ? 0 : squareWigth / 2;
      this.x = (x * triangleSide * 3) / 2;
      this.y = y * squareWigth + shift;
      this.height = squareWigth;
      this.width = squareHeigth;
    }
  }

  @Input()
  point = { x: 0, y: 0 };

  @HostBinding('style.height.px')
  height = squareHeigth;
  @HostBinding('style.width.px')
  width = squareWigth;

  @HostBinding('style.left.px')
  x?: number = 0;
  @HostBinding('style.top.px')
  y?: number = 0;

  shift = 0;
  modul = 2;

  points = calculatePoints(this.shift);

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    console.log(event.key, this.shift);
    if (event.key == '1') {
      this.shift++;
      this.points = calculatePoints(this.shift, this.modul);
      this.locationUpdate();
    }
    if (event.key == '2') {
      this.modul = this.modul == 2 ? 3 : 2;
      this.points = calculatePoints(this.shift, this.modul);
      this.locationUpdate();
    }
  }
}
