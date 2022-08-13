import {
  Component,
  HostBinding,
  HostListener,
  Input,
  OnInit,
} from '@angular/core';
import {
  calculatePoints,
  IPoint,
  pointsToString,
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
    setInterval(() => this.calculatePoints(), 1000 / 30);
  }

  calculatePoints() {
    if (this.endTime > Date.now()) {
      const diff1 = this.endTime - this.startTime;
      const diff2 = Date.now() - this.startTime;
      const rel = diff2 / diff1;
      const newPoints = this.startPoints.map((p, ind) => ({
        x: p.x + (this.endPoints[ind].x - p.x) * rel,
        y: p.y + (this.endPoints[ind].y - p.y) * rel,
      }));
      this.points = pointsToString(newPoints);
    } else {
      this.points = pointsToString(this.endPoints);
    }
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

  startPoints: IPoint[] = [];
  endPoints: IPoint[] = calculatePoints(this.shift);
  startTime = 0;
  endTime = 0;

  points = pointsToString(this.endPoints);

  @HostListener('document:keyup', ['$event.target', '$event'])
  keydown(element: Element, event: KeyboardEvent) {
    if (event.key == '1') {
      this.shift++;
      console.log(this.shift);
      this.startPoints = this.endPoints;
      this.endPoints = calculatePoints(this.shift, this.modul);
      this.startTime = Date.now();
      this.endTime = this.startTime + 1000;
      this.locationUpdate();
    }
    if (event.key == '2') {
      this.modul = this.modul == 2 ? 3 : 2;
      this.startPoints = this.endPoints;
      this.endPoints = calculatePoints(this.shift, this.modul);
      this.startTime = Date.now();
      this.endTime = this.startTime + 1000;
      this.locationUpdate();
    }
  }
}
