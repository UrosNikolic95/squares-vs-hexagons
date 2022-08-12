import { Component, HostBinding, Input, OnInit } from '@angular/core';
import {
  points,
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
    const x = this?.x || this.point.x;
    const y = this?.y || this.point.y;

    const shift = y % 2 == 0 ? 0 : this.width / 2;

    this.x = x * this.width + shift;
    this.y = (y * triangleSide * 3) / 2;
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

  points = points;
}
